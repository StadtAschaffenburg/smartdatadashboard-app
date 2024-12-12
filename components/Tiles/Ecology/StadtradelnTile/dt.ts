import { PayloadDataType } from '@/utils/payload'

export type InputDataType = {
  name: string
  data: {
    year: number
    km: string | number
  }[]
}

export type TransformedDataType = {
  [sanitizedName: string]: InputDataType
}

export type ChartContainerProps = {
  CsvData: PayloadDataType[]
}

export type ChartProps = {
  compare: boolean
  data: InputDataType
  max: number
  other?: InputDataType
}
