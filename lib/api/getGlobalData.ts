import { client } from '@/lib/cms'

export default async function getGlobalData(id: string, default_value: any = '') {
  const data = await client.getCachedData(`content?collection=global&id=${id}`)

  return data || default_value
}