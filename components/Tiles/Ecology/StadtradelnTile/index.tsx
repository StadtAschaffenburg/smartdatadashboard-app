import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ChartContainer from './ChartContainer'
import { PayloadDataType } from '@/utils/payload'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const CsvData: PayloadDataType[] = getSourceByName(
    tile_payload,
    'stadtradeln.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <ChartContainer CsvData={CsvData} />
    </BaseTile>
  )
}
