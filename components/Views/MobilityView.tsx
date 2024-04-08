import Columns from '../Layout/Columns'
import AWMTile from '../Tiles/Mobility/AWM'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'
import PassengerTile from '../Tiles/Mobility/PassengerTile'
import BaseView from './BaseView'

export default function MobilityView() {
  return (
    <BaseView type="mobility">
      <StadtradelnTile />

      <Columns>
        <BicycleChartTile />

        <BusTile />

        <AWMTile />

        <PassengerTile />
      </Columns>
    </BaseView>
  )
}
