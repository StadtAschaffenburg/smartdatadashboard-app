// import all tiles

// ecology
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
import LightningTile from '@/components/Tiles/Ecology/LightningTile'
import AirqualityTile from '@/components/Tiles/Ecology/AirqualityTile'
import PollenTile from '@/components/Tiles/Ecology/PollenTile'
import WeatherStationsTile from '@/components/Tiles/Ecology/WeatherStationsTile'
import ThermalHazardTile from '@/components/Tiles/Ecology/ThermalHazardTile'
import WaterTile from '@/components/Tiles/Ecology/WaterTile'
import PlasticWasteTile from '@/components/Tiles/Ecology/PlasticWasteTile'
import BiomassTile from '@/components/Tiles/Ecology/BiomassTile'

// society
import GeburtenSterbefaelleTile from '@/components/Tiles/Society/GeburtenSterbefaelleTile'
import KulturTile from '@/components/Tiles/Society/KulturTile'
import FreizeitTile from '@/components/Tiles/Society/FreizeitTile'
import BevoelkerungTile from '@/components/Tiles/Society/BevoelkerungTile'
import StadtteilTile from '@/components/Tiles/Society/StadtteilTile'

// economy
import OnlinediensteTile from '@/components/Tiles/Economy/OnlinediensteTile'
import PendlerTile from '@/components/Tiles/Economy/PendlerTile'
import HotelTile from '@/components/Tiles/Economy/HotelTile'

// misc
import FallbackTile from '@/components/Tiles/FallbackTile'
import { TilePayloadType, TileType } from '@/types/tiles'

interface TileFactoryProps {
  type: TileType
  tile_data: TilePayloadType | undefined
}

/**
 * The TileFactory is a helper function to create tiles dynamically.
 *
 * @param param TileFactoryProps
 * @returns Tile
 */
export default function TileFactory({ type, tile_data }: TileFactoryProps) {
  if (!tile_data) {
    return <div>Invalid data: {type}</div>
  }

  let Tile = (() => <></>) as React.FC<{
    type: TileType
    tile_payload: TilePayloadType
  }>

  switch (type) {
    // ---- ECOLOGY ----
    case 'ecology-energyConsumption':
      Tile = EnergyConsumptionTile
      break
    case 'ecology-weather':
      Tile = WeatherTile
      break
    case 'ecology-uv':
      Tile = UVTile
      break
    case 'ecology-climateDevelopment':
      Tile = ClimateDevelopmentTile
      break
    case 'ecology-climateIndices':
      Tile = ClimateIndicesTile
      break
    case 'ecology-stadtradeln':
      Tile = StadtradelnTile
      break
    case 'ecology-bicycle':
      Tile = BicycleChartTile
      break
    case 'ecology-passengers':
      Tile = PassengerTile
      break
    case 'ecology-bus':
      Tile = BusTile
      break
    case 'ecology-stadtwerke':
      Tile = StadtwerkeTile
      break
    case 'ecology-pvanlagen':
      Tile = PVAnlagenTile
      break
    case 'ecology-lanterns':
      Tile = LanternsTile
      break
    case 'ecology-lightning':
      Tile = LightningTile
      break
    case 'ecology-airquality':
      Tile = AirqualityTile
      break
    case 'ecology-pollen':
      Tile = PollenTile
      break
    case 'ecology-weatherStations':
      Tile = WeatherStationsTile
      break
    case 'ecology-thermalHazard':
      Tile = ThermalHazardTile
      break
    case 'ecology-wasserverbrauch':
      Tile = WaterTile
      break
    case 'ecology-plastikmuell':
      Tile = PlasticWasteTile
      break
    case 'ecology-BiomassEnergy':
      Tile = BiomassTile
      break

    // ---- SOCIETY ----
    case 'society-GeburtenSterbefaelle':
      Tile = GeburtenSterbefaelleTile
      break
    case 'society-kultureinrichtungen':
      Tile = KulturTile
      break
    case 'society-freizeiteinrichtungen':
      Tile = FreizeitTile
      break
    case 'society-bevoelkerung':
      Tile = BevoelkerungTile
      break
    case 'society-stadtteil':
      Tile = StadtteilTile
      break

    // ---- ECONOMY ----
    case 'economy-onlinedienste':
      Tile = OnlinediensteTile
      break
    case 'economy-pendler':
      Tile = PendlerTile
      break
    case 'economy-hotelbesucher':
      Tile = HotelTile
      break

    // ---- FALLBACK ----
    default:
      Tile = FallbackTile
      break
  }

  return <Tile tile_payload={tile_data} type={type} />
}
