import { InputDataType } from '@/utils/sources'

export type BusContentProps = {
  data: InputDataType[]
}

export type BusDataType = {
  ZEIT: number
  [key: string]: number | undefined
}
