import Columns from '../Layout/Columns'
import LanternsTile from '../Tiles/Ecology/LanternsTile'
import PVAnlagenTile from '../Tiles/Ecology/PVAnlagenTile'
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
