export type PassengerDataType = {
  INDEX: number
  value: number
}

export type PassengerContentProps = {
  data: PassengerDataType[]
}

export interface DataValue {
  current: number
  previous: number | null
}
