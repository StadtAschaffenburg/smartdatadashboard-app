import { client } from '@/lib/cms'

export default async function getPageData(id: string, default_value: any = []) {
  const data = await client.getCachedData(`content?collection=page&id=${id}`)

  return data || default_value
}