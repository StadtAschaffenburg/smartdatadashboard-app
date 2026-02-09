import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './Co2EmssionsTileContent'
import { TileSplitView } from '../../Base/TileSplitView'
import Markdown from '@/components/Elements/Markdown'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <Content tile_payload={tile_payload} />
        </TileSplitView.Left>
        {tile_payload?.legend && (
          <TileSplitView.Right>
            <Markdown
              content={tile_payload?.legend}
            />
          </TileSplitView.Right>
        )}
      </TileSplitView>
    </IconTile>
  )
}
