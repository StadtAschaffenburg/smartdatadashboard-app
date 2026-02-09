import { format } from 'date-fns'
import IconTile from '@/components/Tiles/Base/IconTile'
import ClimateIndicesChart from './ClimateIndicesChart'
import { TileSplitView } from '../../Base/TileSplitView'
import Block from '@/components/Elements/Block'
import { TileProps } from '@schleegleixner/react-statamic-api'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      embedId={type}
      tile_payload={tile_payload}
    >
      <TileSplitView>
        <TileSplitView.Left>
          <ClimateIndicesChart />
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Block text={tile_payload?.legend ?? ''} />
        </TileSplitView.Right>
      </TileSplitView>
    </IconTile>
  )
}
