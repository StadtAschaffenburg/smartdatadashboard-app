import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PassengerContent from './PassengerContent'
import { PassengerDataType } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const PassengerData: PassengerDataType[] = getSourceByName(
    tile_payload,
    'passenger_data.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <PassengerContent data={PassengerData}></PassengerContent>
    </BaseTile>
  )
}
