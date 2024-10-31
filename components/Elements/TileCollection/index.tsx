import TileFactory from '@/utils/TileFactory'
import { getCollection } from '@/lib/cms'
import { TileDataType } from '@/types/tiles'
import NoResults from './noResults'
import { TileCollectionProps } from './dt'
import Columns from '@/components/Layout/Columns'

export default async function TileCollection({
  type = null,
  category = null,
  action_dimension = null,
  action_field = null,
  sdg_target = null,
  search = null,
}: TileCollectionProps) {
  const collection: TileDataType[] = await getCollection('tiles')

  // apply filters based on provided props
  const filtered_collection = collection.filter(item => {
    return (
      (type === null || item.tile_id === type) &&
      (category === null || item.tags.category === category) &&
      (action_dimension === null ||
        item.tags.action_dimension === action_dimension) &&
      (action_field === null ||
        item.tags.action_field.includes(action_field)) &&
      (sdg_target === null || item.tags.sdg_target.includes(sdg_target)) &&
      (search === null ||
        item.search.toLowerCase().includes(search.toLowerCase()))
    )
  })

  if (filtered_collection.length === 0) {
    return <NoResults />
  }

  // arrange in groups
  const groupedTiles = []
  let currentLayout: any = null
  let currentGroup: any = []

  filtered_collection.forEach(tile => {
    if (tile.layout !== currentLayout) {
      if (currentGroup.length > 0) {
        groupedTiles.push({ layout: currentLayout, tiles: currentGroup })
      }
      currentLayout = tile.layout
      currentGroup = []
    }
    currentGroup.push(tile)
  })

  // add the last group
  if (currentGroup.length > 0) {
    groupedTiles.push({ layout: currentLayout, tiles: currentGroup })
  }

  return (
    <>
      {groupedTiles.map((group, index) => (
        <Columns columns={group.layout === 'default' ? 2 : 1} key={index}>
          {group.tiles.map((tile: TileDataType) => (
            <TileFactory key={tile.tile_id} type={tile.tile_id} />
          ))}
        </Columns>
      ))}
    </>
  )
}
