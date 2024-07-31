import Columns from '../Layout/Columns'
import LanternsTile from '../Tiles/Energy/LanternsTile'
import PVAnlagenTile from '../Tiles/Energy/PVAnlagenTile'
import BaseView from './BaseView'

export default function EnergyView() {
  return (
    <BaseView type="energy">
      <Columns>
        <LanternsTile />
        <PVAnlagenTile />
      </Columns>
    </BaseView>
  )
}
