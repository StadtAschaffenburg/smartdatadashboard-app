import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'
import { getTileDatapoint } from '@/lib/api/getTileData'
import { CapacityType } from './dt'

export default async function PVAnlagenTile() {
  const tile_id = `${TilePrefix}-pvanlagen`

  const capacity: CapacityType =
    (await getTileDatapoint(tile_id, 'kapazitaet')) * 1

  return (
    <BaseTile embedId={tile_id} title={<PVAnlagenTitle capacity={capacity} />}>
      <PVAnlagenContent capacity={capacity} />
    </BaseTile>
  )
}
