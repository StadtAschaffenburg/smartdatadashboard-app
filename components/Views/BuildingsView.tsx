import EnergyComsumptionTile from '../Tiles/Buildings/EnergyConsumption'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <EnergyComsumptionTile />
    </BaseView>
  )
}
