import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'

export default function Tile({ type, tile_payload }: TileProps) {
  return <IconTile embedId={type} tile_payload={tile_payload} />
}
