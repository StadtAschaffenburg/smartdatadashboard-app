import { getContent } from '@/lib/cms'

export default async function getSectionsData() {
  const data = await getContent('sections');

  return data || [];
}