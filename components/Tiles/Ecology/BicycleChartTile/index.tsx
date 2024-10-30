import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import BicycleChartContent from './BicycleChartContent'
import getTileData from '@/lib/api/getTileData'

export default async function BicycleChartTile() {
  const tile_id = `${TilePrefix}-bicycle`

  const tile_data = await getTileData(tile_id)

  return (
    <BaseTile embedId={tile_id}>
      <>
        <BicycleChartContent />
        <Spacer size={'lg'} />
        <Title as="h5">{tile_data?.info ?? ''}</Title>
      </>
    </BaseTile>
  )
}
