import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import TileContent from './TileContent'
import { DataType } from './dt'
import { getSourceByName } from '@/utils/payload'
import { getAllStrings } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const Data: DataType[] = getSourceByName(tile_payload, 'onlinedienste.csv')

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent data={Data} {...getAllStrings(tile_payload)} />
    </BaseTile>
  )
}
