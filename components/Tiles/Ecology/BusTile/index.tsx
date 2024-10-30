import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import BusContent from './BusContent'
import getSourceData from '@/lib/api/getSourceData'
import { BusDataType } from './dt'

export default async function BusTile() {
  const tile_id = `${TilePrefix}-bus`

  const BusData: BusDataType[] = await getSourceData(
    'stadtwerke-bus-fahrzeuge.csv',
  )

  return (
    <BaseTile embedId={tile_id}>
      <BusContent data={BusData} />
    </BaseTile>
  )
}
