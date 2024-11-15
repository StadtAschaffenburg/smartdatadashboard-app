import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PassengerContent from './PassengerContent'
import getDataSource from '@/lib/api/getDataSource'
import { PassengerDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const PassengerData: PassengerDataType[] =
    await getDataSource('passenger_data.csv')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <PassengerContent data={PassengerData}></PassengerContent>
    </BaseTile>
  )
}
