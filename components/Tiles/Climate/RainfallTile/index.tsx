import ClimateTile from '../ClimateTile'
import RainfallTileContent from './RainfallTileContent'

export default function RainfallTile() {
  return (
    <ClimateTile
      dataSource="Deutscher Wetterdienst"
      embedId={'climate-rainfall'}
      live
      title={'Niederschlag'}
    >
      <RainfallTileContent />
    </ClimateTile>
  )
}
