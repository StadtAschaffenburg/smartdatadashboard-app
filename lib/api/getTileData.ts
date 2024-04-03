import getContent from '@/utils/ContentFactory'

export default async function getTileData(id: string) {
  const data = await getContent(id, 'tiles');

  return data?.[0];
}