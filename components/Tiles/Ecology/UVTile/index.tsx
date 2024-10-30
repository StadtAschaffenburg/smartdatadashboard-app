import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import UVTileContent from './UVTileContent'

export default async function UVTile() {
  const tile_id = `${TilePrefix}-uv`

  return (
    <BaseTile embedId={tile_id}>
      <UVTileContent />
    </BaseTile>
  )
}
