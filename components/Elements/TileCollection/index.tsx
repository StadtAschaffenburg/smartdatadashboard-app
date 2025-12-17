'use client'

import TileFactory from '@/utils/factories/TileFactory'
import { TileDataType } from '@schleegleixner/react-statamic-api'
import NoResults from './noResults'
import { TileCollectionProps } from './dt'
import Columns from '@/components/Layout/Columns'
import { useSearchParams } from 'next/navigation'

// normalizes a string for consistent comparison
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-\s]/g, '') // removes dashes and spaces
    .normalize('NFD') // breaks down accented characters
    .replace(/[\u0300-\u036f]/g, '') // removes diacritics
}

// smart search function to check if needle exists in haystack
function smartSearch(needle: string | null, haystack: string): boolean {
  if (!needle) {
    return true
  }

  const normalizedNeedle = normalizeString(needle)
  const normalizedHaystack = normalizeString(haystack)

  // split haystack into words (space, comma, or dash as separator)
  const haystackTerms = normalizedHaystack.split(/[\s,-]+/)

  // check if the normalized needle is found in any term or the whole haystack
  return (
    haystackTerms.some(term => term.includes(normalizedNeedle)) ||
    normalizedHaystack.includes(normalizedNeedle)
  )
}

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
  if (!collection || collection.length === 0) {
    return <NoResults />
  }

  // apply filters based on provided props
  const filteredCollection = collection.filter(item => {
    if (search_query && search_query.length >= 3) {
      return smartSearch(search_query, item.search)
    }
    return (
      (category === null || item.tags.category === category) &&
      (action_dimension === null ||
        item.tags.action_dimension === action_dimension) &&
      (action_field === null ||
        item.tags.action_field.includes(action_field)) &&
      (sdg_target === null || item.tags.sdg_targets?.includes(sdg_target))
    )
  })

  if (filteredCollection.length === 0) {
    return <NoResults />
  }

  // arrange in groups
  const groupedTiles = []
  let currentLayout: string | null = null
  let currentGroup: TileDataType[] = []

  filteredCollection.forEach(tile => {
    if (tile.layout !== currentLayout) {
      if (currentGroup.length > 0) {
        groupedTiles.push({ layout: currentLayout, tiles: currentGroup })
      }
      currentLayout = tile.layout
      currentGroup = []
    }
    currentGroup.push(tile)
  })

  // Add the last group
  if (currentGroup.length > 0) {
    groupedTiles.push({ layout: currentLayout, tiles: currentGroup })
  }

  return (
    <section id="tile-collection">
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
    </section>
  )
}
