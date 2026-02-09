import { TileProps } from '@schleegleixner/react-statamic-api'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from './StadtteilContent'
import { TileSplitView } from '../../Base/TileSplitView'
import Block from '@/components/Elements/Block'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <Content tile_payload={tile_payload} />
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Block text={tile_payload?.legend ?? ''} />
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
