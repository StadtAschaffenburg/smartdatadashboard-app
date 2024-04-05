
const cache = new Map()

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
  let api = `${
    process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
  }content/${collection}`

  if (id) {
    api += `/${id}`
  }

  const lifetime: number = Number(process.env.NEXT_PUBLIC_CMS_CACHE_DURATION) || 720

  const data = await getJSON(api, lifetime)

  if (data?.status === 'success') {
    return data?.payload
  }

  return []
}

/**
 * Get JSON from API with caching
 * cache_duration in minutes
 */
export async function getJSON(endpoint: string, cache_duration: number = 60) {
  // get from cache
  const cache_key = `api-${endpoint}`
  const cache_entry = cache.get(cache_key)

  const cache_data = cache_entry ? cache_entry.data : null
  const stale = cache_entry ? Date.now() > cache_entry.expiry : false

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
      console.log('⏳ API request timed out:', endpoint)
      return cache_data || false // stale content is better than no content
    }

    // store with an expiry timestamp
    cache.set(cache_key, {
      data,
      expiry: Date.now() + cache_duration * 60 * 1000,
    })
    console.log('💾 Fetched API content:', endpoint)

    return data
  } catch (error) {
    console.log('🔥 Everything is on fire!', endpoint)
    return false
  }
}

export default getContent
