import Columns from '../Layout/Columns'
import EnergietraegerTile from '../Tiles/Energy/EnergietraegerTile'
import LanternsTile from '../Tiles/Energy/LanternsTile'
import PVAnlagenTile from '../Tiles/Energy/PVAnlagenTile'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '../Tiles/Energy/WindEnergyTile'
import BaseView from './BaseView'

export default function EnergyView() {
  return (
    <BaseView type="energy">
      <Columns>
        <PhotovoltTile />
        <WindEnergyTile />

        <EnergietraegerTile />
      </Columns>
      <Columns>
        <LanternsTile />
        <PVAnlagenTile />
      </Columns>
    </BaseView>
  )
}
