'use client'

import TileFactory from '@/utils/TileFactory'
import { TileDataType } from '@/types/tiles'
import NoResults from './noResults'
import { TileCollectionProps } from './dt'
import Columns from '@/components/Layout/Columns'
import { useSearchParams } from 'next/navigation'

export default function TileCollection({
  collection,
  category = null,
  action_dimension = null,
  action_field = null,
  sdg_target = null,
  search_query = null,
}: TileCollectionProps) {
  // get search query from the URL if not provided
  const searchParams = useSearchParams()
  search_query = search_query ?? searchParams?.get('suche') ?? null

  // apply filters based on provided props
  if (collection.length === 0) {
    return <NoResults />
  }

  const filtered_collection = collection.filter(item => {
    return (
      (category === null || item.tags.category === category) &&
      (action_dimension === null ||
        item.tags.action_dimension === action_dimension) &&
      (action_field === null ||
        item.tags.action_field.includes(action_field)) &&
      (sdg_target === null || item.tags.sdg_target?.includes(sdg_target)) &&
      (search_query === null ||
        item.search.toLowerCase().includes(search_query.toLowerCase()))
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
            <TileFactory
              key={tile.tile_id}
              tile_data={tile.content}
              type={tile.tile_id}
            />
          ))}
        </Columns>
      ))}
    </>
  )
}
