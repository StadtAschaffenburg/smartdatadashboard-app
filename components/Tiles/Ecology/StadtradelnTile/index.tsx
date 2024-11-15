import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ChartContainer from './ChartContainer'
import getDataSource from '@/lib/api/getDataSource'
import { CsvDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const CsvData: CsvDataType[] = await getDataSource('stadtradeln.csv')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <ChartContainer CsvData={CsvData} />
    </BaseTile>
  )
}
