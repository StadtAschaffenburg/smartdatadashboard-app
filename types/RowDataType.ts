import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { RowDataType as TileRowDataType } from '@schleegleixner/react-statamic-api'

type RowDataType = Omit<TileRowDataType, 'variant'> & {
  variant?: TileVariantTypes | null
}

export default RowDataType
