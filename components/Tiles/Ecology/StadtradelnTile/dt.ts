export type InputDataType = {
  name: string
  data: {
    year: number
    km: number
  }[]
}

export type ChartContainerProps = {
  StadtradelnData: InputDataType
}

export type ChartProps = {
  compare: boolean
  data: InputDataType
  other?: InputDataType
}
