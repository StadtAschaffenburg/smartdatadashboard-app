import { format } from 'date-fns'
import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import ClimateIndicesChart from './ClimateIndicesChart'
import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'
import Title from '@/components/Elements/Title'
import getSourceData from '@/lib/api/getSourceData'
import { ClimateIndex } from './dt'

export default async function ClimateIndicesTile() {
  const tile_id = `${TilePrefix}-climateIndices`

  const climateIndicesData: ClimateIndex[] = await getSourceData(
    'climate_indices.json',
  )
  const tile_data = await getTileData(tile_id)

  return (
    <BaseTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      embedId={tile_id}
      live
    >
      <TileSplitView>
        <TileSplitView.Left>
          <div className="rounded bg-white">
            <ClimateIndicesChart data={climateIndicesData} />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {tile_data?.legend ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
