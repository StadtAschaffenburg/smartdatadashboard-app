import getContent from '@/lib/cms'

export default async function getTileData(id: string, default_value: any = []) {
  const data = await getContent(id, 'page');

  return data || default_value;
}