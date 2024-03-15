import Columns from '../Layout/Columns'
import ClimateIndicesTile from '../Tiles/Climate/ClimateIndices'
import CO2EmissionsTile from '../Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '../Tiles/Climate/Devlopment'
import GarbageTile from '../Tiles/Climate/Garbage'
import WeatherTile from '../Tiles/Climate/WeatherTile'
import DataCountTile from '../Tiles/Data/DataCountTile'
import LightningTile from '../Tiles/Climate/LightningTile'
import RainfallTile from '../Tiles/Climate/RainfallTile'
import UVTile from '../Tiles/Climate/UVTile'
import BaseView from './BaseView'

export default function ClimateView() {
  return (
    <BaseView type="climate">
      <Columns>

        <WeatherTile />
        <ClimateDevelopmentTile />

      </Columns>

      <Columns>

        <LightningTile />
        <RainfallTile />
        <UVTile />

      </Columns>

      <ClimateIndicesTile />

    </BaseView>
  )
}
