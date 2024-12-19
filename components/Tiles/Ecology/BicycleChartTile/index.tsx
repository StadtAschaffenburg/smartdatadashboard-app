import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import BicycleChartContent from './BicycleChartContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} live tile_payload={tile_payload}>
      <BicycleChartContent />
    </BaseTile>
  )
}
