import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PassengerContent from './PassengerContent'
import { PassengerDataType } from './dt'
import { getSourceByName } from '@/utils/payload'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function Tile({ type, tile_payload }: TileProps) {
  const passenger_data = getSourceByName(
    tile_payload,
    'passenger_data.csv',
  ) as PassengerDataType[]

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      {passenger_data ? (
        <PassengerContent data={passenger_data} />
      ) : (
        <RequestIndicator />
      )}
    </BaseTile>
  )
}
