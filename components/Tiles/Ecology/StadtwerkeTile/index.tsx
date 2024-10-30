import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import StadtwerkeContent from './StadtwerkeContent'
import getSourceData from '@/lib/api/getSourceData'
import { InputData } from './dt'

export default async function AWMTile() {
  const tile_id = `${TilePrefix}-stadtwerke`

  const MobilityData: InputData[] = await getSourceData('e-mobilitaet.csv')

  return (
    <BaseTile embedId={tile_id}>
      <StadtwerkeContent data={MobilityData} />
    </BaseTile>
  )
}
