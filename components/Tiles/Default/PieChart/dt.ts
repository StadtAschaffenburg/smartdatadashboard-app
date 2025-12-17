import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import type { PieSeriesOption } from 'echarts'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type PieChartDataType = PieSeriesOption['data']

export type ChartProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType
  variant: TileVariantTypes
}
