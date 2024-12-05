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

export type BuildingType = Omit<DataType, 'datum'>

export const buildings: Record<keyof BuildingType, string> = {
  rathaus: 'Rathaus',
  frankenstolz_arena: 'F.A.N Frankenstolz Arena',
  stadtbibliothek: 'Stadtbibliothek',
  brentanoschule: 'Brentanoschule',
}

export type BuildingDataType = {
  [key in keyof BuildingType]: {
    strom: {
      current: number[]
      previous: number[] | null
      currentSum: number
      previousSum: number | null
    }
    waerme: {
      current: number[]
      previous: number[] | null
      currentSum: number
      previousSum: number | null
    }
  }
}

export interface ViewProps {
  data: BuildingDataType
  mode: 'strom' | 'waerme'
  yearIndex: number
  years: Array<number>
}
