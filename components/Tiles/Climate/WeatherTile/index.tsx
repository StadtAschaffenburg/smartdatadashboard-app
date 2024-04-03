import ClimateTile from '../ClimateTile'
import WeatherTileContent from './WeatherTileContent'

export default function WeatherTile() {
  return (
    <ClimateTile
      dataSource="Stadt Aschaffenburg"
      embedId={'climate-weather'}
      live
      title={'Wetter aktuell'}
    >
      <WeatherTileContent />
    </ClimateTile>
  )
}
