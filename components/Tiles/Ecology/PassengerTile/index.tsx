import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'
import PassengerContent from './PassengerContent'
import getSourceData from '@/lib/api/getSourceData'
import { PassengerDataType } from './dt'

export default async function PassengerTile() {
  const tile_id = `${TilePrefix}-passengers`

  const PassengerData: PassengerDataType[] =
    await getSourceData('passenger_data.csv')

  return (
    <BaseTile embedId={tile_id}>
      <PassengerContent data={PassengerData}></PassengerContent>
    </BaseTile>
  )
}
