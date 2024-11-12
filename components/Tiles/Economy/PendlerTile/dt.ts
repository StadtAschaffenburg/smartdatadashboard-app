import { VariantType } from '@/types/dimensionMapping'

export type DataType = {
  ZEIT: string
  einpendler: number
  auspendler: number
}

export type ContentProps = {
  data: DataType[]
  einpendler?: string
  auspendler?: string
  variant?: VariantType
}
