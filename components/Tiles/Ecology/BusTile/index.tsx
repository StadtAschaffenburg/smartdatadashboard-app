import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import BusContent from './BusContent'
import getDataSource from '@/lib/api/getDataSource'
import { BusDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const BusData: BusDataType[] = await getDataSource(
    'stadtwerke-bus-fahrzeuge.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <BusContent data={BusData} />
    </BaseTile>
  )
}
