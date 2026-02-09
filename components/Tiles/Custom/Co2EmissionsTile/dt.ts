import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import type { LineSeriesOption } from 'echarts'

export interface LineChartDataType {
  title: string
  unit?: string
  icon?: string
  color?: string
  visible?: Boolean
  seriesOption?: LineSeriesOption[]
  variant: TileVariantTypes
}
export type LineChartDataTypes = Record<string, LineChartDataType>

export type ChartProps = {
  tile_payload: TilePayloadType
}
