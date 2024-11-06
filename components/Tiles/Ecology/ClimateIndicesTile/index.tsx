import { format } from 'date-fns'
import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import ClimateIndicesChart from './ClimateIndicesChart'
import { TileSplitView } from '../../Base/TileSplitView'
import Title from '@/components/Elements/Title'
import getSourceData from '@/lib/api/getSourceData'
import { ClimateIndex } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  const climateIndicesData: ClimateIndex[] = await getSourceData(
    'climate_indices.json',
  )

  return (
    <BaseTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      embedId={type}
      live
      tile_payload={tile_payload}
    >
      <TileSplitView>
        <TileSplitView.Left>
          <div className="rounded bg-white">
            <ClimateIndicesChart data={climateIndicesData} />
          </div>
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
