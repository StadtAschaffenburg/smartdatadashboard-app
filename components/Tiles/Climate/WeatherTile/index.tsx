import ClimateTile from '../ClimateTile'
import WeatherTileContent from './WeatherTileContent'

export default function WeatherTile() {
  const tile_id = 'climate-weather'

  return (
    <ClimateTile embedId={tile_id} live title={'Wetter aktuell'}>
      <WeatherTileContent />
    </ClimateTile>
  )
}
