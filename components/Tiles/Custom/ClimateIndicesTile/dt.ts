import { ForwardRefExoticComponent, JSX, SVGProps } from 'react'
import { LineSeriesOption } from 'echarts'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type IndicesTypes =
  | 'eistage'
  | 'frosttage'
  | 'heisse_tage'
  | 'sommertage'
  | 'tropennaechte'

export type ClimateIndex = {
  dwd_station_id: number
  eistage: number
  frosttage: number
  heisse_tage: number
  observation_type: string
  sommertage: number
  timestamp: string
  tropennaechte: number
}

export type ClimateIndicesChartProps = {
  data: ClimateIndex[]
}

export type ClimateIndices = Record<
  IndicesTypes,
  {
    title: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    seriesOption: LineSeriesOption
    variant: TileVariantTypes
    visible: boolean
  }
>
