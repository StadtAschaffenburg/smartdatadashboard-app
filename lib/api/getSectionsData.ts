import { client } from '@/lib/cms'

export default async function getSectionsData() {
  const data = await client.getContent('sections');

  return data || [];
}