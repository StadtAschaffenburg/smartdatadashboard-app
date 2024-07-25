import { client } from '@/lib/cms'

export default async function getTileData(id: string, attribute: string | false = false, default_value: any = []) {
  const data = await client.getCachedData(`content?collection=tile&id=${id}`)

  if (attribute !== false) {
    return data && data[attribute] ? data[attribute] : default_value
  }

  return data || default_value
}

export async function getTileStrings(id: string, default_value: any = []) {
  return await getTileData(id, 'strings', default_value)
}

export async function getTileDatapoint(id: string, datapoint_id: string) {
  const data = await getTileData(id, 'datapoints');

  if (!data || !Array.isArray(data)) { return null }

  const item = data.find(entry => entry.id === datapoint_id)
  
  return item ? item.val : null
}

export async function getTileSource(id: string, source_id: string) {
  const data = await getTileData(id, 'sources');

  if (!data || !Array.isArray(data)) { return null }

  const item = data.find(entry => entry.id === source_id)
  
  return item ? item.content : null
}

export type TileContentStrings = {
  title: string
  text: string
}[]