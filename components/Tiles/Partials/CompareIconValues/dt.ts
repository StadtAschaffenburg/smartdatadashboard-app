import { TilePayloadType } from '@/types/tiles'

export type ContentProps = {
  tile_payload: TilePayloadType
  keys?: string[]
  iconLeft: React.ReactElement
  iconRight: React.ReactElement
}
