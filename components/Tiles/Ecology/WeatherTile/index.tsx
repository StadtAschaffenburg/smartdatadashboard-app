import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import WeatherTileContent from './WeatherTileContent'

export default function WeatherTile() {
  const tile_id = `${TilePrefix}-weather`

  return (
    <BaseTile embedId={tile_id} live>
      <WeatherTileContent />
    </BaseTile>
  )
}
