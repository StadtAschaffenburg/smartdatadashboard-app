import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from './LightningTileContent'
import { TileProps } from '@schleegleixner/react-statamic-api'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent />
    </BaseTile>
  )
}
