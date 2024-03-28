import directus from '@/lib/directus'

import fs from 'fs'
import path from 'path'

const cache = new Map()

const getTileContent = async (
  id: string | number,
  collection: string = 'tiles',
) => {
  // get from cache
  const cache_key = `content-${collection}-${id}`
  const cache_data = cache.get(cache_key)
  if (cache_data) {
    return cache_data
  }

  const api = `${
    process.env.NEXT_PUBLIC_SSD_API || 'http://smartcitydashboard-cms.test/api/'
  }content/${collection}/${id}`
  try {
    const res = await fetch(api)
    const data = await res.json()

    if (data.status === 'success') {
      cache.set(cache_key, data.payload)
      setTimeout(() => cache.delete(cache_key), 3600 * 1000)
      console.log('💾 Fetched new content:', collection, id)
      return data.payload
    }

    return false
  } catch (error) {
    return false
  }
}

// TODO: Remove Directus dependency

export async function getContent(
  id: string,
  collection: string = 'tiles',
  query: object = {},
  query_id: string = 'default',
) {
  const data = await getTileContent(id, collection)
  return [data]
}

// can be removed - this is only required for collections, surveys and success stories
export async function getOne(
  id: number | string,
  collection: string = 'tiles',
) {
  const data = await getTileContent(id, collection)
  return data
}

export async function getCollections() {
  const filePath = getFilePath('collections')
  let data = readFile(filePath)

  if (!data) {
    console.log("Can't find file: ", filePath)
    return
    data = await directus.items('collections').readByQuery(setDefaultQuery())
    saveFile(filePath, data)
  }

  return data
}

export function getImage(image: string) {
  return '/images/placeholder.jpeg'
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

function setDefaultQuery(query: any = {}) {
  if (!query.filter) {
    query.filter = {} // Setzt 'filter', falls es nicht existiert
  }

  query.filter.status = 'published' // Fügt 'status: published' sicher hininzu

  return query
}

export default getContent
