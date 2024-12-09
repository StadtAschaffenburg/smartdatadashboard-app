import { InputDataType } from '@/utils/sources'
import { TilePayloadType } from '@/types/tiles'

export type BusContentProps = {
  data: InputDataType[]
  tile_payload: TilePayloadType
}

export type BusDataType = {
  ZEIT: number
  [key: string]: number | undefined
}
