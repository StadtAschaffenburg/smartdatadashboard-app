import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from '@/components/Tiles/Partials/CompareIconValues'
import IconPlaceholder from '@/components/Icons/Placeholder'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent
        iconLeft={<IconPlaceholder />}
        iconRight={<IconPlaceholder />}
        tile_payload={tile_payload}
      />
    </BaseTile>
  )
}
