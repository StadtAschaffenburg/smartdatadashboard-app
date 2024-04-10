import getContent from '@/lib/cms'

export default async function getTileData(id: string, attribute: string | false = false, default_value: any = []) {
  const data = await getContent('tile', id);

  if (attribute !== false) {
    return data && data[attribute] ? data[attribute] : default_value
  }

  return data || default_value;
}

export async function getTileStrings(id: string, default_value: any = []) {
  return await getTileData(id, 'strings', default_value)
}

export type TileContentStrings = {
  title: string
  text: string
}[]
