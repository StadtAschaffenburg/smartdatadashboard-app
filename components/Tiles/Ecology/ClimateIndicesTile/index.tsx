import { format } from 'date-fns'
import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ClimateIndicesChart from './ClimateIndicesChart'
import { TileSplitView } from '../../Base/TileSplitView'
import Block from '@/components/Elements/Block'
import { ClimateIndex } from './dt'
import useSourceFile from '@/hooks/useSourceFile'

export default function Tile({ type, tile_payload }: TileProps) {
  const climateIndicesData: ClimateIndex[] = useSourceFile(
    'climate_indices.json',
  )

  return (
    <BaseTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      embedId={type}
      tile_payload={tile_payload}
    >
      <TileSplitView>
        <TileSplitView.Left>
          <div className="rounded bg-white">
            <ClimateIndicesChart data={climateIndicesData} />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Block text={tile_payload?.legend ?? ''} />
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
