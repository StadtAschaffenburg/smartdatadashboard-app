import ClimateTile from '../ClimateTile'
import UVTileContent from './UVTileContent'

export default function UVTile() {
  const tile_id = 'climate-uv'

  return (
    <ClimateTile
      dataSource="Deutscher Wetterdienst"
      embedId={tile_id}
      live
      title={'UV-Index'}
    >
      <UVTileContent />
    </ClimateTile>
  )
}
