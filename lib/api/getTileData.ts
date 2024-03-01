import getContent from '@/utils/ContentFactory'

export default async function getTileData(id: string) {
  const data = await getContent(id, 'tiles', {
    filter: {
      tile_id: id,
    }
  }, 'tileData');

  return data?.[0];
}