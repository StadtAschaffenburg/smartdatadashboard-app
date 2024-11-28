import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from './StadtteilContent'
import { TileSplitView } from '../../Base/TileSplitView'
import Title from '@/components/Elements/Title'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <Content tile_payload={tile_payload} />
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {tile_payload?.legend ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
