import { getCachedData } from '@/lib/cms'

export default async function getSectionsData(default_value: any = []) {
  const data = await getCachedData('content?collection=sections')

  return data || default_value
}
