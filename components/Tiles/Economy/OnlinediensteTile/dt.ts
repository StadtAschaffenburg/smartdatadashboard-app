import { VariantType } from '@/types/dimensionMapping'

export type DataType = {
  ZEIT: string
  total: number
  digital: number
}

export type ContentProps = {
  data: DataType[]
  services_analog?: string
  services_digital?: string
  variant?: VariantType
}
