import TileFactory from '@/utils/TileFactory'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <TileFactory type="ecology-passengers" />
      <TileFactory type="ecology-pvanlagen" />
      <TileFactory type="ecology-lanterns" />
      <TileFactory type="ecology-climateIndices" />
      <TileFactory type="ecology-climateDevelopment" />
      <TileFactory type="ecology-bus" />
      <TileFactory type="ecology-bicycle" />
      <TileFactory type="ecology-energyConsumption" />
      <TileFactory type="ecology-stadtradeln" />
    </BaseView>
  )
}
