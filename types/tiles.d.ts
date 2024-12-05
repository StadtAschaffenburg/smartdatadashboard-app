import { ActionDimensionsType, ActionFieldsType } from './dimensionMapping'
import { TargetType } from './targetMapping'
import { CategoryType } from './TilesCategory'

export type TileTypePrefix = 'ecology' | 'society' | 'economy'

export type TileType = `${TileTypePrefix}-${string}`

export type TileStringType = {
  [key: string]: string
}

export type TileDatapointType = {
  id: string
  val: number
}

export type TileSourceType = {
  file_name: string
  content: any
}

export interface TilePayloadType {
  tile_id: string
  subtitle: string | null
  title: string | null
  copy: string | ReactElement<any, string | JSXElementConstructor<any>> | null
  details: string
  legend: string | null
  name: string | null
  retrieval: string | null
  source: string | null
  strings: TileStringType[] | null
  datapoints: TileDatapointType[] | null
  table_keys: string[] | null
  layout: string | null
  tags: {
    category: CategoryType
    action_dimension: ActionDimensionsType
    action_field: ActionFieldsType
    sdg_target: TargetType
  }
  live: boolean | null
  files: string[] | null
  sources: TileSourceType[]
  search: string
  modifier: number | null
  unit: string | null
}

export interface TileProps {
  type: TileType
  tile_payload: TilePayloadType
}

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
  content?: TilePayloadType
}
