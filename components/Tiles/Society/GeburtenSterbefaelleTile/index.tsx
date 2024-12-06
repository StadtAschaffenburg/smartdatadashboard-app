import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from '@/components/Tiles/Partials/CompareIconValues'
import { IconBirth, IconDeath } from '@/components/Icons/Social'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent
        iconLeft={<IconBirth />}
        iconRight={<IconDeath />}
        tile_payload={tile_payload}
      />
    </BaseTile>
  )
}
