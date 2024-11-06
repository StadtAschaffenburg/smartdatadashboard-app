import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import WeatherTileContent from './WeatherTileContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} live tile_payload={tile_payload}>
      <WeatherTileContent />
    </BaseTile>
  )
}
