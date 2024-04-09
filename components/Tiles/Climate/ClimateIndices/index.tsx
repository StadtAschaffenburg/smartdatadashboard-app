import { format } from 'date-fns'
import ClimateTile from '../ClimateTile'
import ClimateIndicesChart from './ClimateIndicesChart'
import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'
import Title from '@/components/Elements/Title'

export default async function ClimateIndicesTile() {
  const tile_id = 'climate-indices'
  const data = await getTileData(tile_id)

  return (
    <ClimateTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      dataSource="Deutscher Wetterdienst"
      embedId={tile_id}
      live
      subtitle=""
      title="Klimakenntage"
    >
      <TileSplitView>
        <TileSplitView.Left>
          <div className="rounded bg-white">
            <ClimateIndicesChart />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {data?.legend ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </ClimateTile>
  )
}
