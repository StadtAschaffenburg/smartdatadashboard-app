export type PassengerDataType = {
  ZEIT: number
  value: number
}

export type PassengerContentProps = {
  data: PassengerDataType[]
}

export interface DataValue {
  current: number
  previous: number | null
}
