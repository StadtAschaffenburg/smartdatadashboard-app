import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from '@/components/Tiles/Partials/IconText'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <Content tile_payload={tile_payload} />
    </BaseTile>
  )
}
