import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import BusContent from './BusContent'
import { BusDataType } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const BusData: BusDataType[] = getSourceByName(
    tile_payload,
    'stadtwerke-bus-fahrzeuge.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <BusContent data={BusData} />
    </BaseTile>
  )
}
