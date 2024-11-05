import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import BusContent from './BusContent'
import getSourceData from '@/lib/api/getSourceData'
import { BusDataType } from './dt'

export default async function BusTile({ type, tile_payload }: TileProps) {
  const BusData: BusDataType[] = await getSourceData(
    'stadtwerke-bus-fahrzeuge.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <BusContent data={BusData} />
    </BaseTile>
  )
}
