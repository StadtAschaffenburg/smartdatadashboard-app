import { TilePayloadType, TileType } from '@/types/tiles'

// import all tiles
import IconValues from '@/components/Tiles/Prefab/IconValues'
import LineChart from '@/components/Tiles/Prefab/LineChart'
import IconText from '@/components/Tiles/Prefab/IconText'
import CompareIconValues from '@/components/Tiles/Prefab/CompareIconValues'
import Basic from '@/components/Tiles/Prefab/Basic'

// ecology
import EnergyConsumptionTile from '@/components/Tiles/Ecology/EnergyConsumptionTile'
import WeatherTile from '@/components/Tiles/Ecology/WeatherTile'
import UVTile from '@/components/Tiles/Ecology/UVTile'
import ClimateDevelopmentTile from '@/components/Tiles/Ecology/ClimateDevelopmentTile'
import ClimateIndicesTile from '@/components/Tiles/Ecology/ClimateIndicesTile'
import StadtradelnTile from '@/components/Tiles/Ecology/StadtradelnTile'
import BicycleChartTile from '@/components/Tiles/Ecology/BicycleChartTile'
import PassengerTile from '@/components/Tiles/Ecology/PassengerTile'
import LightningTile from '@/components/Tiles/Ecology/LightningTile'
import AirqualityTile from '@/components/Tiles/Ecology/AirqualityTile'
import PollenTile from '@/components/Tiles/Ecology/PollenTile'
import WeatherStationsTile from '@/components/Tiles/Ecology/WeatherStationsTile'
import ThermalHazardTile from '@/components/Tiles/Ecology/ThermalHazardTile'

// society
import StadtteilTile from '@/components/Tiles/Society/StadtteilTile'

// economy

// misc
import FallbackTile from '@/components/Tiles/FallbackTile'

interface TileFactoryProps {
  type: TileType
  tile_data: TilePayloadType | undefined
}

// Mapping der Tile-Komponenten
const tileMap: Record<
  TileType,
  React.FC<{ type: TileType; tile_payload: TilePayloadType }>
> = {
  // ---- DEFAULT ----
  icontext: IconText,
  compareiconvalues: CompareIconValues,
  iconvalues: IconValues,
  linechart: LineChart,
  basic: Basic,

  // ---- ECOLOGY ----
  weather: WeatherTile,
  energyconsumption: EnergyConsumptionTile,
  uv: UVTile,
  climatedevelopment: ClimateDevelopmentTile,
  climateindices: ClimateIndicesTile,
  stadtradeln: StadtradelnTile,
  bicyclechart: BicycleChartTile,
  passenger: PassengerTile,
  lightning: LightningTile,
  airquality: AirqualityTile,
  pollen: PollenTile,
  weatherstations: WeatherStationsTile,
  thermalhazard: ThermalHazardTile,

  // ---- SOCIETY ----
  stadtteil: StadtteilTile,

  // ---- ECONOMY ----
}

export default function TileFactory({ type, tile_data }: TileFactoryProps) {
  if (!tile_data) {
    return <div>Invalid data: {type}</div>
  }

  // get tile component by tile id (type), tile_data.tile_type or use fallback
  const Tile =
    tileMap[type] ||
    (tile_data?.tile_type ? tileMap[tile_data.tile_type] : undefined) ||
    FallbackTile
  return <Tile tile_payload={tile_data} type={type} />
}
