export type InputDataType = {
  Zeit: string
  'Brentanoschule (kWh)': string
  'Stadbibliothek (kWh)': string
  'F.A.N Frankenstolz Arena (kWh)': string
  'Rathaus (kWh)': string
}

export type DataType = {
  datum: number
  brentanoschule: number | null
  stadtbibliothek: number | null
  frankenstolz_arena: number | null
  rathaus: number | null
}

export type EnergyConsumptionContentProps = {
  waermeDataInput: InputDataType[]
  stromDataInput: InputDataType[]
}
