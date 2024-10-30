import TileFactory from '@/utils/TileFactory'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <TileFactory type="ecology-energyConsumption" />
    </BaseView>
  )
}
