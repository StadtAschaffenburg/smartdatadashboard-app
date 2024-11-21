export type InputDataType = {
  ZEIT: number
  trinkwasser: number
  leitungswasser: number
}

export type ContentProps = {
  data: InputDataType[]
}

export interface DataValue {
  current: number
  previous: number | null
}
