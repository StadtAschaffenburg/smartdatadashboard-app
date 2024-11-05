// import all tiles
import EnergyConsumptionTile from '@/components/Tiles/Ecology/EnergyConsumptionTile'
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

// misc
import { TilePayloadType, TileType } from '@/types/tiles'
import getTileData from '@/lib/api/getTileData'

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
  const tile_payload: TilePayloadType = await getTileData(type)

  if (!tile_payload) {return null}

  switch (type) {
    // ---- ECOLOGY ----
    case 'ecology-energyConsumption':
      return <EnergyConsumptionTile tile_payload={tile_payload} type={type} />
    case 'ecology-weather':
      return <WeatherTile tile_payload={tile_payload} type={type} />
    case 'ecology-uv':
      return <UVTile tile_payload={tile_payload} type={type} />
    case 'ecology-climateDevelopment':
      return <ClimateDevelopmentTile tile_payload={tile_payload} type={type} />
    case 'ecology-climateIndices':
      return <ClimateIndicesTile tile_payload={tile_payload} type={type} />
    case 'ecology-stadtradeln':
      return <StadtradelnTile tile_payload={tile_payload} type={type} />
    case 'ecology-bicycle':
      return <BicycleChartTile tile_payload={tile_payload} type={type} />
    case 'ecology-passengers':
      return <PassengerTile tile_payload={tile_payload} type={type} />
    case 'ecology-bus':
      return <BusTile tile_payload={tile_payload} type={type} />
    case 'ecology-stadtwerke':
      return <StadtwerkeTile tile_payload={tile_payload} type={type} />
    case 'ecology-pvanlagen':
      return <PVAnlagenTile tile_payload={tile_payload} type={type} />
    case 'ecology-lanterns':
      return <LanternsTile tile_payload={tile_payload} type={type} />

    // ---- SOCIETY ----

    // ---- ECONOMY ----

    default:
      return null
  }
}
