import axios from 'axios'

export default async function getTileData(id: string, attribute: string | false = false, default_value: any = []) {
  const host = process.env.NEXT_PUBLIC_CACHE_ROUTE || 'http://localhost:3000/api/'
  const request =  await axios(`${host}content?collection=tile&id=${id}`) as any
  const data = request?.data || default_value

  if (attribute !== false) {
    return data && data[attribute] ? data[attribute] : default_value
  }

  return data
}

export async function getTileStrings(id: string, default_value: any = []) {
  return await getTileData(id, 'strings', default_value)
}

export type TileContentStrings = {
  title: string
  text: string
}[]
