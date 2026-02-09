import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './DriveTypeContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <Content tile_payload={tile_payload} />
    </IconTile>
  )
}
