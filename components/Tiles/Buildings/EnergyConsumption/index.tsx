import BuildingTile from '../BuildingsTile'

import { format } from 'date-fns'
import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'
import Title from '@/components/Elements/Title'
import EnergyConsumptionContent from './EnergyConsumptionContent'

export default async function EnergyComsumptionTile() {
  const data = await getTileData('building-energyConsumption')
  const infoText = data?.info ?? ''

  return (
    <BuildingTile
      dataRetrieval={format(new Date(), '01.MM.yyyy')}
      dataSource="Stadt Münster &ndash; Amt für Immobilienmanagement"
      embedId={'building-energyConsumption'}
      live
      subtitle={
        'So entwickelt sich über das Jahr verteilt der Verbrauch von Wärme und Strom in ausgewählten städtischen Gebäuden'
      }
      title={'Energieverbrauch'}
    >
      <TileSplitView>
        <TileSplitView.Left>
          <div>
            <EnergyConsumptionContent />
          </div>
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {infoText}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BuildingTile>
  )
}
