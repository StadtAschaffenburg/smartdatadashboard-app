import fs from 'fs'
import path from 'path'

const cache = new Map()

const getTileContent = async (
  id: string | number,
  collection: string = 'tiles',
) => {
  const api = `${
    process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
  }content/${collection}/${id}`

  const data = await getJSON(api, 12 * 60)

  if (data?.status === 'success') {
    return data?.payload
  }

  return []
}

export async function getContent(id: string, collection: string = 'tiles') {
  const data = await getTileContent(id, collection)
  return [data]
}

export async function getOne(
  id: number | string,
  collection: string = 'tiles',
) {
  const data = await getTileContent(id, collection)
  return data
}

// legacy
export async function getCollections() {
  const filePath = getFilePath('collections')
  const data = readFile(filePath)

  if (!data) {
    console.log("Can't find file: ", filePath)
    return []
  }

  return data
}

export function getImage(image: string = 'placeholder') {
  return '/images/' + image + '.jpeg'
}

export async function getJSON(endpoint: string, cache_duration: number = 60) {
  // get from cache
  const cache_key = `api-${endpoint}`
  const cache_data = cache.get(cache_key)
  if (cache_data) {
    return cache_data
  }

  try {
    const res = await fetch(endpoint)
    const data = await res.json()

    cache.set(cache_key, data)
    setTimeout(() => cache.delete(cache_key), cache_duration * 60 * 1000)
    console.log('💾 Fetched API content:', endpoint)

    return data
  } catch (error) {
    return false
  }
}

function getFilePath(
  folder: string,
  id: number | string = 'all',
  query_id: string = 'default',
) {
  return path.join(
    process.cwd(),
    'assets',
    'content',
    folder,
    `${query_id}@${id}.json`,
  )
}

function readFile(filePath: string) {
  try {
    // try to read from file
    const jsonData = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(jsonData)
  } catch (err) {
    return 0
  }
}

function saveFile(filePath: string, data: any) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error("Can't save new file: ", err)
      return false
    }
    console.log(`💾 Saved new content: ${filePath}`)
  })

  return true
}

export default getContent
