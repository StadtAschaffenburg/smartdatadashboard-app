import { client } from '@/lib/cms'

export default async function getPageData(id: string, default_value: any = []) {
  const data = await client.getCache(`content?collection=page&id=${id}`)

  return data || default_value
}