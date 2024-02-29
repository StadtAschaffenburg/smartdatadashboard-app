import directus, { tileCollectionName } from '../directus'

export default async function getTileData(id: string) {
  const { data } = await directus.items(tileCollectionName).readByQuery({
    filter: {
      tile_id: id,
    },
  })

  return data?.[0]
}
