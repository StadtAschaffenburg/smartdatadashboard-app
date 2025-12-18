import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type DestrictMapping = {
  id: string
  title?: string
  position: { x: number; y: number }
  share: number
  value: {
    current: number
    previous: number | null
  }
}

export interface StadtteilMapProps {
  destict_data: DestrictMapping[]
  variant: TileVariantTypes
}

export type MapDataType = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  radius: number
}

export type StadtteilMapRowProps = {
  destict_data: DestrictMapping[]
  entry_class?: string
  anchor_class?: string
  variant: TileVariantTypes
}
