import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from '@/components/Tiles/Partials/IconValues'
import { IconPeople } from '@/components/Icons/Social'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <Content tile_payload={tile_payload}>
        <IconPeople className="h-20 fill-society md:h-32" />
      </Content>
    </BaseTile>
  )
}
