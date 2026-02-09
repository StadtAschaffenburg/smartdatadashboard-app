'use client'

import { TilePayloadType, TileType } from '@schleegleixner/react-statamic-api'

// import default tiles
import IconValues from '@/components/Tiles/Default/IconValues'
import LineChart from '@/components/Tiles/Default/LineChart'
import LineChartStacked from '@/components/Tiles/Default/LineChartStacked'
import BarChart from '@/components/Tiles/Default/BarChart'
import BarChartStacked from '@/components/Tiles/Default/BarChartStacked'
import TreemapChart from '@/components/Tiles/Default/TreemapChart'
import IconText from '@/components/Tiles/Default/IconText'
import CompareIconValues from '@/components/Tiles/Default/CompareIconValues'
import CompareValues from '@/components/Tiles/Default/CompareValues'
import Basic from '@/components/Tiles/Default/BasicTile'
import FallbackTile from '@/components/Tiles/Default/FallbackTile'
import PieChart from '@/components/Tiles/Default/PieChart'

// custom tiles
import EnergyConsumptionTile from '@/components/Tiles/Custom/EnergyConsumptionTile'
import WeatherTile from '@/components/Tiles/Custom/WeatherTile'
import UVTile from '@/components/Tiles/Custom/UVTile'
import ClimateDevelopmentTile from '@/components/Tiles/Custom/ClimateDevelopmentTile'
import ClimateIndicesTile from '@/components/Tiles/Custom/ClimateIndicesTile'
import StadtradelnTile from '@/components/Tiles/Custom/StadtradelnTile'
import PassengerTile from '@/components/Tiles/Custom/PassengerTile'
import AirqualityTile from '@/components/Tiles/Custom/AirqualityTile'
import PollenTile from '@/components/Tiles/Custom/PollenTile'
import ThermalHazardTile from '@/components/Tiles/Custom/ThermalHazardTile'
import Co2EmissionsTile from '@/components/Tiles/Custom/Co2EmissionsTile'
import DriveTypes from '@/components/Tiles/Custom/DriveTypes'
import BicycleChartTile from '@/components/Tiles/Custom/BicycleChartTile'
import LightningTile from '@/components/Tiles/Custom/LightningTile'
import WeatherStationsTile from '@/components/Tiles/Custom/WeatherStationsTile'
import EnergietraegerTile from '@/components/Tiles/Custom/EnergietraegerTile'
import StadtteilTile from '@/components/Tiles/Custom/StadtteilTile'

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
  comparevalues: CompareValues,
  iconvalues: IconValues,
  linechart: LineChart,
  'linechart-stacked': LineChartStacked,
  barchart: BarChart,
  'barchart-stacked': BarChartStacked,
  treemapchart: TreemapChart,
  basic: Basic,
  piechart: PieChart,
  co2emissions: Co2EmissionsTile,

  // ---- Custom ----
  weather: WeatherTile,
  energyconsumption: EnergyConsumptionTile,
  uv: UVTile,
  climatedevelopment: ClimateDevelopmentTile,
  climateindices: ClimateIndicesTile,
  stadtradeln: StadtradelnTile,
  passenger: PassengerTile,
  airquality: AirqualityTile,
  pollen: PollenTile,
  thermalhazard: ThermalHazardTile,
  drivetypes: DriveTypes,
  bicyclechart: BicycleChartTile,
  lightning: LightningTile,
  weatherstations: WeatherStationsTile,
  energietraeger: EnergietraegerTile,
  stadtteil: StadtteilTile,
}

export default function TileFactory({ type, tile_data }: TileFactoryProps) {
  if (!tile_data) {
    return <div className="text-secondary">Could not fetch tile data for tile: {type}. Please contact an administrator.</div>
  }

  // get tile component by tile id (type), tile_data.tile_type or use fallback
  const Tile =
    tileMap[type] ||
    (tile_data?.tile_type ? tileMap[tile_data.tile_type] : undefined) ||
    FallbackTile
  return <Tile tile_payload={tile_data} type={type} />
}
