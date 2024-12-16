import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import CompareIconValues from '@/components/Tiles/Prefab/Partials/CompareIconValues'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <CompareIconValues tile_payload={tile_payload} />
    </BaseTile>
  )
}
