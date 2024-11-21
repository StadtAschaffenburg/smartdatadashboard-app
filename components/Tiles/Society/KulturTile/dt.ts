import { ForwardRefExoticComponent, SVGProps } from 'react'
import { LineSeriesOption } from 'echarts'

export type IndicesTypes = 'stadthalle' | 'stadttheater'

export type InputDataType = {
  ZEIT: number
  stadthalle: number
  stadttheater: number
}

export type ContentProps = {
  data: InputDataType[]
}

export type InstitutionIndices = Record<
  IndicesTypes,
  {
    title: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    seriesOption: LineSeriesOption
  }
>

export type IndicesChartProps = {
  data: InputDataType[]
}
