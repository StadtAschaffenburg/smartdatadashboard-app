import { TilePayloadType } from '@/types/tiles'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export interface InstitutionIndex {
  title: string
  icon?: string
  color?: string
  visible?: boolean
  seriesOption?: {
    name: string
    data: (string | number | null)[][]
    color: string
  }
  variant: TileVariantTypes
}

export type InstitutionIndices = Record<string, InstitutionIndex>

export type ChartProps = {
  tile_payload: TilePayloadType
}
