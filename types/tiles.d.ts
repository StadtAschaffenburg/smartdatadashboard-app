import { ActionDimensionsType, ActionFieldsType } from './dimensionMapping'
import { TargetType } from './targetMapping'
import { CategoryType } from './TilesCategory'

export type TileTypePrefix = 'ecology' | 'society' | 'economy'

export type TileType = `${TileTypePrefix}-${string}`

export type TileDataType = {
  tile_id: TileIdType
  title: string
  layout: 'default' | 'full'
  tags: {
    category: CategoryType
    action_dimension: ActionDimensionsType
    action_field: ActionFieldsType
    sdg_target: TargetType
  }
  search: string
}

export interface TilePayloadType {
  tile_id: string
  subtitle: string | null
  title: string
  copy: string
  details: string
  legend: string | null
  name: string
  retrieval: string | null
  source: string | null
  strings: string[]
  datapoints: any[] | null
  layout: string
  tags: {
    category: CategoryType
    action_dimension: ActionDimensionsType
    action_field: ActionFieldsType
    sdg_target: TargetType
  }
}

export interface TileProps {
  type: TileType
  tile_payload: TilePayloadType
}
