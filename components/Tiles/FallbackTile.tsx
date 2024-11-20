import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'

export default function Tile({ type, tile_payload }: TileProps) {
  return <BaseTile embedId={type} tile_payload={tile_payload} />
}
