import { TilePayloadType } from '@schleegleixner/react-statamic-api'

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
  tile_payload: TilePayloadType
}

export type ChartProps = {
  compare: boolean
  data: InputDataType
  max: number
  other?: InputDataType
}
