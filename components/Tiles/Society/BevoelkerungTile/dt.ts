export type InputDataType = {
  ZEIT: number
  stadt: number
}

export type ContentProps = {
  data: InputDataType[]
}

export interface DataValue {
  current: number
  previous: number | null
}
