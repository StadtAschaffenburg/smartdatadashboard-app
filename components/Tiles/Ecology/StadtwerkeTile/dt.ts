import { TilePayloadType } from '@/types/tiles'

export type InputData = {
  ZEIT: number
  Dieselantrieb: number
  Hybridantrieb: number
  Elektroantrieb: number
  Erdgasantrieb: number
}

export type ContentProps = {
  data: InputData[]
  tile_payload: TilePayloadType
}
