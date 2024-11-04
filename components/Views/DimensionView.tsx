import React from 'react'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import { getCollection } from '@/lib/cms'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'

interface DimensionViewProps {
  action_dimension?: ActionDimensionsType
  action_field?: ActionFieldsType
  search_query?: string
}

export default async function DimensionView({
  action_dimension,
  action_field,
  search_query,
}: DimensionViewProps) {
  const collection = await getCollection('tiles')

  return (
    <BaseView type="building">
      <TileCollection
        action_dimension={action_dimension}
        action_field={action_field}
        category="default"
        collection={collection}
        search_query={search_query}
      />
    </BaseView>
  )
}
