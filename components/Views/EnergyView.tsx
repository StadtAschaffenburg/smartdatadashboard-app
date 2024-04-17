import Columns from '../Layout/Columns'
import LanternsTile from '../Tiles/Energy/LanternsTile'
import PVAnlagenTile from '../Tiles/Energy/PVAnlagenTile'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'
import BaseView from './BaseView'

export default function EnergyView() {
  return (
    <BaseView type="energy">
      <Columns>
        <PhotovoltTile />
        <PVAnlagenTile />
      </Columns>

      <Columns>
        <LanternsTile />
      </Columns>
    </BaseView>
  )
}
