import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ChartProps = {
  tile_payload: TilePayloadType
}

export type RowProps = {
  name: string
  count: number
  min: number
  max: number
  bar: Boolean
  Listofprogress: number[]
  variant: TileVariantTypes
  max_total: number
}

export type DriveTypeData = {
  name: string
  count: number
  data: number[]
  change: number
}

export type DriveTypeDataCollection = Record<string, DriveTypeData>