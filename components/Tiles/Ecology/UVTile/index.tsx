import {
  EcologyTile as BaseTile,
} from '@/components/Tiles/Ecology/EcologyTile'
import UVTileContent from './UVTileContent'

export default function UVTile() {
  const tile_id = 'climate-uv'

  return (
    <BaseTile
      dataSource="Deutscher Wetterdienst"
      embedId={tile_id}
      live
      title={'UV-Index'}
    >
      <UVTileContent />
    </BaseTile>
  )
}
