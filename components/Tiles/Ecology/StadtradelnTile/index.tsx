import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import ChartContainer from './ChartContainer'
import getSourceData from '@/lib/api/getSourceData'
import { InputDataType } from './dt'

export default async function StadtradelnTile() {
  const tile_id = 'mobility-stadtradeln'

  const StadtradelnData: InputDataType = await getSourceData('stadtradeln.json')

  return (
    <BaseTile embedId={tile_id}>
      <ChartContainer StadtradelnData={StadtradelnData} />
    </BaseTile>
  )
}
