export type InputData = {
  ZEIT: number
  Dieselantrieb: number
  Hybridantrieb: number
  Elektroantrieb: number
  Erdgasantrieb: number
}

export type ContentProps = {
  data: InputData[]
}
