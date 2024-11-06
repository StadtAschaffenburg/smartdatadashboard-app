import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'
import { getDataPoint } from '@/utils/payload'

export default async function Tile({ type, tile_payload }: TileProps) {
  const capacity: number = getDataPoint(tile_payload, 'kapazitaet')

  return (
    <BaseTile
      embedId={type}
      tile_payload={tile_payload}
      title={<PVAnlagenTitle capacity={capacity} />}
    >
      <PVAnlagenContent capacity={capacity} />
    </BaseTile>
  )
}
