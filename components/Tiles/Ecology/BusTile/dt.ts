export type BusDataType = {
  ZEIT: string
  total: number
  fossil: number
  hybrid: number
  alternativ: number
  elektro: number
}

export type BusContentProps = {
  data: BusDataType[]
}
