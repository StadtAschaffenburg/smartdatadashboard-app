import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ContentProps = {
  keys?: string[]
  tile_payload: TilePayloadType
  children?: React.ReactElement | React.ReactElement[]
  datasource: TileDatasourceType
  variant: TileVariantTypes
}

export interface DataValue {
  current: number
  previous: number | null
}
