import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ChartProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType,
  variant: TileVariantTypes
}
