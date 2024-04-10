import axios from 'axios';

const cache = new Map()
let version_cms = 'v0'

export async function getContent(
  collection: string = 'tile',
  id: string | number | boolean = false,
  use_cache: boolean = true
) {
  await updateContentVersion()
  const endpoint = `${getAPIEndpoint()}content/${collection}${id ? `/${id}` : ''}`

  // get from cache
  const cache_data = cache.get(endpoint)?.payload || null;
  const stale = version_cms !== cache.get(endpoint)?.version || false;

  if (cache_data && !stale && use_cache) {
    return cache_data
  }

  const payload = await fetchJSON(endpoint)

  if (payload !== null) {
    cache.set(endpoint, {
      payload,
      version: version_cms
    })

    return payload
  }

  return cache_data || false // stale content is better than no content
}

export async function getAPI (
  api: string,
  use_cache: boolean = true,
  lifetime: number = 6 * 60 // 6 hours
) {
  const endpoint = `${getAPIEndpoint()}${api}`

  // get from cache
  const cache_data = cache.get(endpoint)?.payload || null;
  const stale = Date.now() <= (cache.get(endpoint)?.expiry || Infinity);

  if (cache_data && !stale && use_cache) {
    return cache_data
  }

  const payload = await fetchJSON(endpoint)

  if (payload !== null) {
    cache.set(endpoint, {
      payload,
      expiry: Date.now() + lifetime * 60 * 1000
    })

    return payload
  }

  return cache_data || false // stale content is better than no content
}

export function getImage(image: string = 'placeholder') {
  return '/images/' + image + '.jpeg'
}

/**
 * Get Version from CMS with caching (in minutes)
 */
const updateContentVersion = async () => {
  const lifetime: number = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 50

  try {
    const current_version = await getAPI('content/version', true, lifetime)

    if (current_version !== null && current_version !== version_cms) {
      console.log('💾 New content version:', version_cms, '=>', current_version)
      version_cms = current_version
      
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

/**
 * Get JSON from API with caching
 * @param endpoint API endpoint
 * @returns JSON data.payload or null
 */
export async function fetchJSON(endpoint: string) {
  const timeout: number = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

  try {
    const response = await axios.get(endpoint, { timeout });
    const data = response.data;

    if (data?.status === 'success' && data?.payload) {
      return data.payload
    }

    return null
  } catch (error) {
    return null
  }
}

function getAPIEndpoint() {
  return process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
}

export default getContent
