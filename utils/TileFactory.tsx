// import all tiles
import EnergyComsumptionTile from '@/components/Tiles/Ecology/EnergyConsumptionTile'
import WeatherTile from '@/components/Tiles/Ecology/WeatherTile'
import UVTile from '@/components/Tiles/Ecology/UVTile'
import ClimateDevelopmentTile from '@/components/Tiles/Ecology/ClimateDevelopmentTile'
import ClimateIndicesTile from '@/components/Tiles/Ecology/ClimateIndicesTile'
import StadtradelnTile from '@/components/Tiles/Ecology/StadtradelnTile'
import BicycleChartTile from '@/components/Tiles/Ecology/BicycleChartTile'
import PassengerTile from '@/components/Tiles/Ecology/PassengerTile'
import BusTile from '@/components/Tiles/Ecology/BusTile'
import StadtwerkeTile from '@/components/Tiles/Ecology/StadtwerkeTile'
import PVAnlagenTile from '@/components/Tiles/Ecology/PVAnlagenTile'
import LanternsTile from '@/components/Tiles/Ecology/LanternsTile'

import { TileTypePrefix } from '@/types/tile'

export type TileType = `${TileTypePrefix}-${string}`

interface TileFactoryProps {
  type: TileType
}

/**
 * The TileFactory is a helper function to create tiles dynamically.
 *
 * @param param TileFactoryProps
 * @returns Tile
 */
export default async function TileFactory({ type }: TileFactoryProps) {
  switch (type) {
    // ---- ECOLOGY ----
    case 'ecology-energyConsumption':
      return <EnergyComsumptionTile />
    case 'ecology-weather':
      return <WeatherTile />
    case 'ecology-uv':
      return <UVTile />
    case 'ecology-climateDevelopment':
      return <ClimateDevelopmentTile />
    case 'ecology-climateIndices':
      return <ClimateIndicesTile />
    case 'ecology-stadtradeln':
      return <StadtradelnTile />
    case 'ecology-bicycle':
      return <BicycleChartTile />
    case 'ecology-passengers':
      return <PassengerTile />
    case 'ecology-bus':
      return <BusTile />
    case 'ecology-stadtwerke':
      return <StadtwerkeTile />
    case 'ecology-pvanlagen':
      return <PVAnlagenTile />
    case 'ecology-lanterns':
      return <LanternsTile />

    // ---- SOCIETY ----

    // ---- ECONOMY ----

    default:
      return null
  }
}
