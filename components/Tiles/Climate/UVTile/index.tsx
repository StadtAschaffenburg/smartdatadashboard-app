import ClimateTile from '../ClimateTile'
import UVTileContent from './UVTileContent'

export default function UVTile() {
  return (
    <ClimateTile
      dataSource="Deutscher Wetterdienst"
      embedId={'climate-uv'}
      live
      title={'UV-Belastung'}
    >
      <UVTileContent />
    </ClimateTile>
  )
}
