import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from './TileContent'
import { DataType } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const Data: DataType[] = getSourceByName(
    tile_payload,
    'geburten_und_sterbefaelle.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent data={Data} {...tile_payload.strings} />
    </BaseTile>
  )
}
