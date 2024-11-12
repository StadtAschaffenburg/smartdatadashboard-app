import axios from 'axios'
import https from 'https'
import url from 'url'
import {
  readApiCache,
  readCache,
  writeApiCache,
  writeContentCache,
  writeFile,
} from '@/lib/cache'
import { getCacheEndpoint, getCMSEndpoint } from '@/utils/api'
import path from 'path'
import { getDataPath } from '@/utils/filesystem'

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export async function handleRequest(
  content_type: string = 'content',
  collection: string = 'tile',
  id: string | number | boolean = false,
  use_cache: boolean = true,
): Promise<any> {
  // get the content from the cache or the API
  if (use_cache) {
    const cache_data = (await readCache(content_type, collection, id)) || null
    if (cache_data) {
      return cache_data // return the cached data
    }
  }

  // get the data from the API
  const endpoint = `${getCMSEndpoint()}${content_type}/${collection}${
    id ? `/${id}` : ''
  }`
  const payload = await fetchJSON(endpoint) // fetch the data from the API

  if (payload) {
    // save the data to the cache
    await writeContentCache(content_type, collection, id, payload)
    return payload
  }

  return null
}

export async function getContent(
  collection: string = 'tiles',
  id: string | number | boolean = false,
  use_cache: boolean = true,
): Promise<any> {
  return handleRequest('content', collection, id, use_cache)
}

export async function getCollection(
  collection: string = 'tiles',
): Promise<any> {
  return handleRequest('collection', collection)
}

export async function getAPI(
  api: string,
  use_cache: boolean = true,
  lifetime: number = 6 * 60,
): Promise<any> {
  const file_name = api.replace(/\//g, '_')

  if (use_cache) {
    const cache_data = (await readApiCache(file_name)) || null
    if (cache_data) {
      return cache_data
    }
  }

  // get the data from the API
  const endpoint = `${getCMSEndpoint()}${api}`
  const payload = await fetchJSON(endpoint)

  if (payload !== null) {
    // save the data to the cache
    writeApiCache(file_name, payload, lifetime)
    return payload
  }

  return null
}

// request data from the cache (if available)
export async function getCachedData(api: string): Promise<any> {
  const api_endpoint = getCacheEndpoint(api)

  // server side rendering
  if (typeof window === 'undefined') {
    try {
      const parsedUrl = url.parse(api, true)
      const { collection, id } = parsedUrl.query

      const response = (await getContent(
        collection as string,
        id as string,
      )) as any
      return response || null
    } catch (error) {
      return null
    }
  }

  // client request
  try {
    const response = (await fetchJSON(api_endpoint)) as any

    return response || null
  } catch (error) {
    return null
  }
}

// fetch the JSON data from the API
// return null if the request failed or the data is not available
export async function fetchJSON(endpoint: string): Promise<any> {
  const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

  try {
    const response = await axios.get(endpoint.replace(/([^:]\/)\/+/g, '$1'), {
      timeout,
      httpsAgent: agent,
    })

    if (response?.data?.result === 'success' || response?.status === 200) {
      return response?.data?.payload ?? response?.data
    }

    return null
  } catch (error) {
    return null
  }
}

export async function getSourceFile(file_name: string): Promise<any> {
  // security: sanitize file_name (no directory traversal)
  const sanitized_file_name = path.basename(file_name)

  const endpoint = getCMSEndpoint(path.join('source', sanitized_file_name))
  const content = await fetchFile(endpoint)

  if (!content) {
    return false
  }

  await writeFile(getDataPath(sanitized_file_name), content)
}

async function fetchFile(endpoint: string): Promise<any> {
  try {
    const response = await fetch(endpoint, { next: { tags: ['cached_data'] } })

    if (response.status !== 200) {
      return null
    }

    const content = await response.text()

    return content
  } catch (error) {
    return null
  }
}

export async function rebuildCache() {
  const collections = ['tiles', 'sources', 'pages']
  const data: any = {}

  for (const collection of collections) {
    data[collection] = await getCollection(collection)
  }

  // rebuild content
  try {
    for (const tile of data.tiles) {
      getContent('tile', tile.tile_id)
    }
    for (const page of data.pages) {
      getContent('page', page.slug)
    }
    for (const source of data.sources) {
      getSourceFile(source.file_name)
    }

    return true
  } catch (error) {
    return false
  }
}
