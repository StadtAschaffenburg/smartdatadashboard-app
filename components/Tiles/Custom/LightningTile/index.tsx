import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from './LightningTileContent'
import { TileProps } from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const variant = getVariantType(tile_payload)

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent variant={variant} />
    </BaseTile>
  )
}
