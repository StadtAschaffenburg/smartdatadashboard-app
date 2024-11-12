import { VariantType } from '@/types/dimensionMapping'

export type DataType = {
  ZEIT: string
  geburten: number
  sterbefaelle: number
}

export type ContentProps = {
  data: DataType[]
  geburten?: string
  sterbefaelle?: string
  variant?: VariantType
}
