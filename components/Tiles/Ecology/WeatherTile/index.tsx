import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import WeatherTileContent from './WeatherTileContent'

export default function WeatherTile() {
  const tile_id = 'climate-weather'

  return (
    <BaseTile embedId={tile_id} live title={'Wetter aktuell'}>
      <WeatherTileContent />
    </BaseTile>
  )
}
