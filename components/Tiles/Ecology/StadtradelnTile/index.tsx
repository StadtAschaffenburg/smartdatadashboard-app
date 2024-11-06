import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ChartContainer from './ChartContainer'
import getSourceData from '@/lib/api/getSourceData'
import { InputDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const StadtradelnData: InputDataType = await getSourceData('stadtradeln.json')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <ChartContainer StadtradelnData={StadtradelnData} />
    </BaseTile>
  )
}
