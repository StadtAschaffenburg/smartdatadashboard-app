import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import StadtwerkeContent from './StadtwerkeContent'
import { InputData } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const MobilityData: InputData[] = getSourceByName(
    tile_payload,
    'e-mobilitaet.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <StadtwerkeContent data={MobilityData} tile_payload={tile_payload} />
    </BaseTile>
  )
}
