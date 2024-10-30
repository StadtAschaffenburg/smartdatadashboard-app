import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'

export default function PVAnlagenTile() {
  const tile_id = `${TilePrefix}-pvanlagen`

  return (
    <BaseTile embedId={tile_id} title={<PVAnlagenTitle />}>
      <PVAnlagenContent></PVAnlagenContent>
    </BaseTile>
  )
}
