import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'
import Title from '@/components/Elements/Title'
import EnergyConsumptionContent from './EnergyConsumptionContent'
import getSourceData from '@/lib/api/getSourceData'
import { InputDataType } from './dt'

export default async function EnergyComsumptionTile() {
  const tile_id = `${TilePrefix}-energyConsumption`
  const data = await getTileData(tile_id)

  const waermeDataInput: InputDataType[] = await getSourceData('waerme.csv')
  const stromDataInput: InputDataType[] = await getSourceData('strom.csv')

  return (
    <BaseTile embedId={tile_id}>
      <TileSplitView>
        <TileSplitView.Left>
          <div>
            <EnergyConsumptionContent
              stromDataInput={stromDataInput}
              waermeDataInput={waermeDataInput}
            />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {data?.info ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
