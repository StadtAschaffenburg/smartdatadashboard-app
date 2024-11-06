import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import StadtwerkeContent from './StadtwerkeContent'
import getSourceData from '@/lib/api/getSourceData'
import { InputData } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const MobilityData: InputData[] = await getSourceData('e-mobilitaet.csv')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <StadtwerkeContent data={MobilityData} />
    </BaseTile>
  )
}
