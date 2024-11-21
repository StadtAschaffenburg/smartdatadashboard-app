import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from './HotelContent'
import { InputDataType } from './dt'
import { getSourceByName } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const InputData: InputDataType[] = getSourceByName(
    tile_payload,
    'hoteluebernachtungen.csv',
  )

  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <Content data={InputData}></Content>
    </BaseTile>
  )
}
