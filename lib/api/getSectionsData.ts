import { client } from '@/lib/cms'

export default async function getSectionsData(default_value: any = []) {
  const data = await client.getCache('content?collection=sections')

  return data || default_value
}