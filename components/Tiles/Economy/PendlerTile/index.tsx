import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from '@/components/Tiles/Partials/CompareIconValues'
import IconPlaceholder from '@/components/Icons/Placeholder'

import { ArrowLongRightIcon as ArrowRight } from '@heroicons/react/24/outline'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent
        iconBackground={<IconPlaceholder />}
        iconLeft={<ArrowRight />}
        iconRight={<ArrowRight />}
        tile_payload={tile_payload}
      />
    </BaseTile>
  )
}
