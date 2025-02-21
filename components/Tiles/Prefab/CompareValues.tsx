import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import CompareValues from '@/components/Tiles/Prefab/Partials/CompareValues'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <CompareValues tile_payload={tile_payload} />
    </BaseTile>
  )
}
