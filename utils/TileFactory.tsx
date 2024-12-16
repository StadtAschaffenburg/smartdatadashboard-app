import { TilePayloadType, TileType } from '@/types/tiles'

// import all tiles
import IconValues from '@/components/Tiles/Prefab/IconValues'
import LineChart from '@/components/Tiles/Prefab/LineChart'
import IconText from '@/components/Tiles/Prefab/IconText'
import CompareIconValues from '@/components/Tiles/Prefab/CompareIconValues'

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
  // ---- ECOLOGY ----
  'ecology-energyConsumption': EnergyConsumptionTile,
  'ecology-weather': WeatherTile,
  'ecology-uv': UVTile,
  'ecology-climateDevelopment': ClimateDevelopmentTile,
  'ecology-climateIndices': ClimateIndicesTile,
  'ecology-stadtradeln': StadtradelnTile,
  'ecology-bicycle': BicycleChartTile,
  'ecology-passengers': PassengerTile,
  'ecology-bus': CompareIconValues,
  'ecology-stadtwerke': CompareIconValues,
  'ecology-pvanlagen': IconText,
  'ecology-lanterns': IconText,
  'ecology-lightning': LightningTile,
  'ecology-airquality': AirqualityTile,
  'ecology-pollen': PollenTile,
  'ecology-weatherStations': WeatherStationsTile,
  'ecology-thermalHazard': ThermalHazardTile,
  'ecology-wasserverbrauch': IconValues,
  'ecology-plastikmuell': IconValues,
  'ecology-BiomassEnergy': IconValues,
  'ecology-auto': IconValues,

  // ---- SOCIETY ----
  'society-GeburtenSterbefaelle': CompareIconValues,
  'society-kultureinrichtungen': LineChart,
  'society-freizeiteinrichtungen': LineChart,
  'society-bevoelkerung': IconValues,
  'society-stadtteil': StadtteilTile,
  'society-arbeitslosigkeit': IconValues,
  'society-erwachsenenbildung': IconValues,
  'society-gleichberechtigung': IconValues,
  'society-integration': IconValues,
  'society-InterkulturellerAustausch': IconValues,
  'society-kinderbetreuung': IconValues,
  'society-krankenhaeuser': IconValues,
  'society-pflege': IconValues,
  'society-bezugSozialleistungen': IconValues,
  'society-wohnraum': IconValues,

  // ---- ECONOMY ----
  'economy-onlinedienste': CompareIconValues,
  'economy-pendler': CompareIconValues,
  'economy-hotelbesucher': IconValues,
  'economy-schulabschluss': IconValues,
  'economy-arbeitslosenquote': IconValues,
  'economy-bruttoinlandsprodukt': IconValues,
  'economy-existenzgruendung': IconValues,
  'economy-hochqualifizierte': IconValues,
  'economy-kommunalerHaushalt': IconValues,
}

export default function TileFactory({ type, tile_data }: TileFactoryProps) {
  if (!tile_data) {
    return <div>Invalid data: {type}</div>
  }

  const Tile = tileMap[type] || FallbackTile
  return <Tile tile_payload={tile_data} type={type} />
}
