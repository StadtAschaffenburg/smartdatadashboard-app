import React from 'react'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import CategoryType from '@/types/TilesCategory'
import Searchbox from '@/components/Elements/Searchbox'
import { getPopulatedCollection } from '@/lib/cms'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import { TargetType } from '@/types/targetMapping'

interface DimensionViewProps {
  action_dimension?: ActionDimensionsType
  action_field?: ActionFieldsType
  category?: CategoryType | null
  search_query?: string
  sdg_target?: TargetType
}

export default async function DimensionView({
  action_dimension,
  action_field,
  category,
  search_query,
  sdg_target,
}: DimensionViewProps) {
  const collection = await getPopulatedCollection('tiles')

  return (
    <BaseView>
      <TileCollection
        action_dimension={action_dimension}
        action_field={action_field}
        category={category}
        collection={collection}
        sdg_target={sdg_target}
        search_query={search_query}
      />
      <Searchbox search_query={search_query} />
    </BaseView>
  )
}
