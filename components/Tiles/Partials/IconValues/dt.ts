import { TilePayloadType } from '@/types/tiles'

export type InputDataType = {
  ZEIT: number
  [key: string]: number | undefined
}

export type ContentProps = {
  tile_payload: TilePayloadType
  children?: React.ReactElement | React.ReactElement[]
}

export interface DataValue {
  current: number
  previous: number | null
}
