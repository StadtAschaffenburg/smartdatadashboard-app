import { TileDatasourceType } from '@schleegleixner/react-statamic-api'
import type { SeriesOption } from 'echarts'
import { ReactElement } from 'react'
import { BorderVariantType } from '@/utils/variants/BorderVariants'

export interface ChartDataType {
  title: string
  unit?: string
  icon?: string
  color?: string
  visible?: boolean
  seriesOption?: SeriesOption[]
  variant: BorderVariantType
  hide_trend?: boolean
}
export type ChartDataTypes = Record<string, ChartDataType>

export type ChartProps = {
  chart_type: 'line' | 'bar'
  stacked?: boolean
  title?: string
  layout?: 'default' | 'full'
  switch?: ReactElement<any>
  datasource: TileDatasourceType
  categorize?: boolean
}
