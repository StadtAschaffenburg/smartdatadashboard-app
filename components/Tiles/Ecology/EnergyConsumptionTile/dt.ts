import { TilePayloadType } from '@/types/tiles'
import { TileVariantTypes } from '@/utils/payload'

export type InputDataType = {
  Zeit: string
  [key: string]: string
}

export type DataType = {
  datum: number
  [key: number]: number | null
}

export type EnergyConsumptionContentProps = {
  waermeDataInput: InputDataType[]
  stromDataInput: InputDataType[]
  tile_payload: TilePayloadType
}

export type BuildingType = Omit<DataType, 'datum'>

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
    label: string
    icon: string | null
  }
}

export interface ViewProps {
  data: BuildingDataType
  mode: 'strom' | 'waerme'
  variant: TileVariantTypes
  yearIndex: number
  years: Array<number>
}
