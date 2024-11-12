import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from './TileContent'
import getSourceData from '@/lib/api/getSourceData'
import { DataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const Data: DataType[] = await getSourceData('geburten_und_sterbefaelle.csv')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent data={Data} {...tile_payload.strings} />
    </BaseTile>
  )
}
