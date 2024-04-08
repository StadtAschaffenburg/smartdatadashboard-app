
const cache = new Map()
let version_cms = 'v0'
let version_expiry = 0

export async function getContent(id: string, collection: string = 'tile') {
  const data = await getCmsContent(collection, id)
  return data
}

export async function getCollection(collection: string = 'tile') {
  const data = await getCmsContent(collection)
  return data
}

export function getImage(image: string = 'placeholder') {
  return '/images/' + image + '.jpeg'
}

const getCmsContent = async (
  collection: string = 'tile',
  id: string | number | boolean = false
) => {
  await updateContentVersion()
  let api = `${getAPIEndpoint()}content/${collection}`

  if (id) {
    api += `/${id}`
  }

  const data = await getJSON(api)

  if (data?.status === 'success') {
    return data?.payload
  }

  return []
}

/**
 * Get Version from CMS with caching (in minutes)
 */
export async function updateContentVersion() {
  if (Date.now() <= version_expiry) {
    return true
  }

  // reset expiry
  const lifetime: number = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 50
  version_expiry = Date.now() + lifetime * 60 * 1000 

  const endpoint = `${getAPIEndpoint()}content/version`
  const timeout: number = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

  const api_promise = fetch(endpoint).then(res => res.json())
  const timeout_promise = new Promise(resolve =>
    setTimeout(() => resolve(false), timeout),
  )

  try {
    const data = await Promise.race([api_promise, timeout_promise])

    if (!data) {
      return false
    }

    // store with an expiry timestamp
    version_cms = data.payload
    // console.log('💾 Fetched API version:', version_cms, version_expiry)

    return true
  } catch (error) {
    return false
  }
}

/**
 * Get JSON from API with caching
 */
export async function getJSON(endpoint: string) {
  // get from cache
  const cache_key = `api-${endpoint}`
  const cache_entry = cache.get(cache_key)

  const cache_data = cache_entry ? cache_entry.data : null
  const stale = cache_entry ? version_cms !== cache_entry.version : false

  if (cache_data && !stale) {
    return cache_data
  }

  const timeout: number = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000

  const api_promise = fetch(endpoint).then(res => res.json())
  const timeout_promise = new Promise(resolve =>
    setTimeout(() => resolve(false), timeout),
  )

  try {
    const data = await Promise.race([api_promise, timeout_promise])

    if (!data) {
      // console.log('⏳ API request timed out:', endpoint)
      return cache_data || false // stale content is better than no content
    }

    // store with version id
    cache.set(cache_key, {
      data,
      version: version_cms
    })
    // console.log('💾 Fetched API content:', endpoint, version_cms)

    return data
  } catch (error) {
    // console.log('🔥 Everything is on fire!', endpoint)
    return false
  }
}

function getAPIEndpoint() {
  return process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
}

export default getContent
