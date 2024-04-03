import { getCollection } from '@/lib/cms'

export default async function getSectionsData() {
  const data = await getCollection('sections');

  return data || [];
}