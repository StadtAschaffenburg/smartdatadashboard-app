import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'
import { getDataPoint } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const count: number = getDataPoint(tile_payload, 'anzahl')
  const capacity: number = getDataPoint(tile_payload, 'kapazitaet')

  return (
    <BaseTile
      embedId={type}
      tile_payload={tile_payload}
      title={<PVAnlagenTitle count={count} />}
    >
      <PVAnlagenContent capacity={capacity} />
    </BaseTile>
  )
}
