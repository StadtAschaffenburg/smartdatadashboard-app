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
import { getSourcePath } from '@/utils/filesystem'
import getDataSource from '@/lib/api/getDataSource'

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export async function handleRequest(
  content_type: string = 'content',
  collection_id: string = 'tile',
  id: string | number | boolean = false,
  use_cache: boolean = true,
): Promise<any> {
  // get the content from the cache or the API
  if (use_cache) {
    const cache_data =
      (await readCache(content_type, collection_id, id)) || null
    if (cache_data) {
      return cache_data // return the cached data
    }
  }

  // get the data from the API
  const endpoint = `${getCMSEndpoint()}${content_type}/${collection_id}${
    id ? `/${id}` : ''
  }`
  const payload = await fetchJSON(endpoint) // fetch the data from the API

  if (payload) {
    // save the data to the cache
    await writeContentCache(content_type, collection_id, id, payload)
    return payload
  }

  return null
}

export async function getContent(
  collection_id: string = 'tiles',
  id: string | number | boolean = false,
  use_cache: boolean = true,
  populate: boolean = false,
): Promise<any> {
  const singular_id = collection_id.endsWith('s')
    ? collection_id.slice(0, -1)
    : collection_id

  const result = await handleRequest('content', singular_id, id, use_cache)

  if (result?.files && populate) {
    result.sources = await Promise.all(
      result.files.map(async (file: string) => {
        const content = await getDataSource(file)
        return {
          file_name: file,
          content,
        }
      }),
    )
  }

  return result
}

export async function getCollection(
  collection_id: string = 'tiles',
): Promise<any> {
  return handleRequest('collection', collection_id)
}

export async function getPopulatedCollection(
  collection_id: string = 'tiles',
  use_cache: boolean = true,
  popuplate_content: boolean = true,
): Promise<any> {
  if (use_cache) {
    const cache_data =
      (await readCache('collection', `${collection_id}.populated`)) || null
    if (cache_data) {
      return cache_data // return the cached data
    }
  }

  const collection = await handleRequest('collection', collection_id)

  await Promise.all(
    collection.map(async (entry: any) => {
      if (entry.tile_id) {
        entry.content = await getContent(
          collection_id,
          entry.tile_id,
          true,
          popuplate_content,
        )
      }

      if (entry.file_name) {
        entry.content = await getDataSource(entry.file_name)
      }
    }),
  )

  await writeContentCache(
    'collection',
    `${collection_id}.populated`,
    false,
    collection,
  )

  return collection
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

async function getSourceFile(file_name: string): Promise<any> {
  const endpoint = getCMSEndpoint(path.join('source', file_name))
  const content = await fetchFile(endpoint)

  if (!content) {
    return false
  }

  await writeFile(getSourcePath(file_name), content)
}

async function fetchFile(endpoint: string): Promise<any> {
  try {
    const response = await fetch(endpoint, { next: { tags: ['cached_files'] } })

    if (response.status !== 200) {
      return null
    }

    const content = await response.text()

    return content
  } catch (error) {
    console.error('fetchFile error:', error)
    return null
  }
}

export async function rebuildCache() {
  const collections = ['pages', 'sources', 'tiles']
  const data: any = {}

  for (const collection of collections) {
    data[collection] = await getCollection(collection)
  }

  // rebuild content
  try {
    // get all content from the CMS
    for (const tile of data.tiles) {
      await getContent('tile', tile.tile_id, false)
    }
    for (const page of data.pages) {
      await getContent('page', page.slug, false)
    }
    for (const source of data.sources) {
      await getSourceFile(source.file_name)
    }

    // rebuild collections
    for (const collection of collections) {
      getPopulatedCollection(collection, false, false)
    }

    return true
  } catch (error) {
    return false
  }
}
