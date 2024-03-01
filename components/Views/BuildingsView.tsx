import Columns from '../Layout/Columns'
import EcoProfitTile from '../Tiles/Buildings/EcoProfit'
import EnergyComsumptionTile from '../Tiles/Buildings/EnergyConsumption'
import RenovationTile from '../Tiles/Buildings/Renovation'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <Columns>
        <EcoProfitTile />

        <RenovationTile />
      </Columns>

      <EnergyComsumptionTile />
    </BaseView>
  )
}
