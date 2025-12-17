import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ContentProps = {
  tile_payload: TilePayloadType
  keys?: string[]
  iconBackground?: React.ReactElement
  iconLeft?: React.ReactElement
  iconRight?: React.ReactElement
  datasource: TileDatasourceType
  variant: TileVariantTypes
}
