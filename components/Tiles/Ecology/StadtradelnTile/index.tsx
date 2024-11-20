import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ChartContainer from './ChartContainer'
import { CsvDataType } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const CsvData: CsvDataType[] = getSourceByName(
    tile_payload,
    'stadtradeln.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <ChartContainer CsvData={CsvData} />
    </BaseTile>
  )
}
