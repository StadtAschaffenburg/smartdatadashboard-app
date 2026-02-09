import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ContentProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType
  keys?: string[]
  variant: TileVariantTypes
}
