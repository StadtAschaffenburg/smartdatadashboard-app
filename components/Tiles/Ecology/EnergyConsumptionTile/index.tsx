import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'
import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'
import Title from '@/components/Elements/Title'
import EnergyConsumptionContent from './EnergyConsumptionContent'
import getSourceData from '@/lib/api/getSourceData'
import { InputDataType } from './dt'

export default async function EnergyConsumptionTile() {
  const tile_id = `${TilePrefix}-energyConsumption`

  // parallelize data fetching for improved performance
  const [data, waermeDataInput, stromDataInput] = await Promise.all([
    getTileData(tile_id),
    getSourceData('waerme.csv'),
    getSourceData('strom.csv'),
  ])

  // render component with fetched data
  return (
    <BaseTile embedId={tile_id}>
      <TileSplitView>
        <TileSplitView.Left>
          <div>
            <EnergyConsumptionContent
              stromDataInput={stromDataInput as InputDataType[]}
              waermeDataInput={waermeDataInput as InputDataType[]}
            />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant="dark">
            {data?.info ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
