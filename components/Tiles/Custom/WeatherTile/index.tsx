import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import WeatherTileContent from './WeatherTileContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} live tile_payload={tile_payload}>
      <WeatherTileContent />
    </IconTile>
  )
}
