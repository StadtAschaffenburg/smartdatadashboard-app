import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ContentProps = {
  tile_payload: TilePayloadType
  keys?: string[]
  iconBackground?: React.ReactElement<any>
  iconLeft?: React.ReactElement<any>
  iconRight?: React.ReactElement<any>
  datasource: TileDatasourceType
  variant: TileVariantTypes
}
