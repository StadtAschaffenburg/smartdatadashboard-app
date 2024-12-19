import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

// import all icons
import {
  IconBiomass,
  IconBuildingArena,
  IconBuildingBibliothek,
  IconBuildingRathaus,
  IconBuildingSchule,
  IconBusAbgas,
  IconBusElektro,
  IconCar,
  IconEarthHeart,
  IconLanterns,
  IconPv,
  IconRecycling,
  IconStadtwerkeAbgas,
  IconStadtwerkeElektro,
  IconWater,
  IconWeatherstation,
} from '@/components/Icons/Ecology'
import {
  IconAdultLearning,
  IconBirth,
  IconCaring,
  IconConversation,
  IconCourt,
  IconDeath,
  IconGroup,
  IconHandcuffs,
  IconHospital,
  IconHospitalBed,
  IconIceSkating,
  IconIndoorPool,
  IconPeople,
  IconPoliceHat,
  IconSocialMobility,
  IconUmbrella,
  IconWalker,
  IconWorldCouple,
  IconWorldPopulation,
} from '@/components/Icons/Social'
import {
  IconBusinessCheck,
  IconBusinessPeople,
  IconBusinessTarget,
  IconCV,
  IconHandProfit,
  IconHotel,
  IconHouseValue,
  IconHousingPrices,
  IconJobSearch,
  IconMoneyBag,
  IconMoneyIncrease,
  IconMoneyKeys,
  IconMoneySafe,
  IconPedestal,
  IconPersonSpreadsheet,
  IconPiggyBank,
  IconPlot,
  IconPromotion,
  IconServiceA,
  IconServiceD,
  IconStockCoin,
  IconStockMarket,
  IconWallet,
} from '@/components/Icons/Economy'
import {
  IconBadge,
  IconExamination,
  IconHangar,
  IconLocation,
  IconMuseum,
  IconPeopleShield,
  IconPeopleSpeaking,
  IconPeopleWaving,
  IconPersonBarchart,
  IconPersonDevelopment,
  IconPersonTime,
  IconPersonWallchart,
  IconPool,
  IconRocket,
  IconSauna,
  IconShade,
  IconShielded,
  IconTownhallAb,
  StadtAbMap,
} from '@/components/Icons/Misc'

import {
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongRightIcon as ArrowRight,
} from '@heroicons/react/24/outline'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: TileVariantTypes
}

type IconComponent =
  | React.FC<{ className: string }>
  | ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & RefAttributes<SVGSVGElement>
    >

const iconMap: Record<string, IconComponent> = {
  placeholder: Placeholder,
  hotel: IconHotel,
  people: IconPeople,
  pv: IconPv,
  lanterns: IconLanterns,
  water: IconWater,
  recycling: IconRecycling,
  biomass: IconBiomass,
  nutzfahrzeug_abgas: IconStadtwerkeAbgas,
  nutzfahrzeug_elektro: IconStadtwerkeElektro,
  bus_abgas: IconBusAbgas,
  bus_elektro: IconBusElektro,
  service_analog: IconServiceA,
  service_digital: IconServiceD,
  births: IconBirth,
  deaths: IconDeath,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,
  stadt_ab: StadtAbMap,
  school: IconBuildingSchule,
  library: IconBuildingBibliothek,
  arena: IconBuildingArena,
  townhall: IconBuildingRathaus,
  hospital: IconHospital,
  hospital_bed: IconHospitalBed,
  car: IconCar,
  court: IconCourt,
  indoor_pool: IconIndoorPool,
  ice_skating: IconIceSkating,
  pool: IconPool,
  sauna: IconSauna,
  adult_learning: IconAdultLearning,
  world_couple: IconWorldCouple,
  business_people: IconBusinessPeople,
  group: IconGroup,
  business_check: IconBusinessCheck,
  world_population: IconWorldPopulation,
  business_target: IconBusinessTarget,
  umbrella: IconUmbrella,
  examination: IconExamination,
  money_safe: IconMoneySafe,
  caring: IconCaring,
  shielded: IconShielded,
  conversation: IconConversation,
  house_value: IconHouseValue,
  stock_coin: IconStockCoin,
  stock_market: IconStockMarket,
  money_bag: IconMoneyBag,
  badge: IconBadge,
  walker: IconWalker,
  job_search: IconJobSearch,
  piggy_bank: IconPiggyBank,
  money_increase: IconMoneyIncrease,
  wallet: IconWallet,
  hangar: IconHangar,
  plot: IconPlot,
  money_keys: IconMoneyKeys,
  housing_prices: IconHousingPrices,
  museum: IconMuseum,
  location: IconLocation,
  pedestal: IconPedestal,
  person_spreadsheet: IconPersonSpreadsheet,
  promotion: IconPromotion,
  rocket: IconRocket,
  person_time: IconPersonTime,
  person_development: IconPersonDevelopment,
  cv: IconCV,
  townhall_ab: IconTownhallAb,
  weatherstation: IconWeatherstation,
  social_mobility: IconSocialMobility,
  person_barchart: IconPersonBarchart,
  person_wallchart: IconPersonWallchart,
  hand_profit: IconHandProfit,
  people_shield: IconPeopleShield,
  people_speaking: IconPeopleSpeaking,
  people_waving: IconPeopleWaving,
  shade: IconShade,
  earth_heart: IconEarthHeart,
  handcuffs: IconHandcuffs,
  police_hat: IconPoliceHat,
} as const

/**
 * The IconFactory is a helper function to create Icons dynamically.
 *
 * @param param IconFactoryProps
 * @returns Icon
 */
export default function IconFactory({
  className = '',
  variant = 'primary',
  type,
}: IconFactoryProps) {
  if (!type || !iconMap[type]) {
    console.warn(`Unknown icon type: ${type}`)
    return <></>
  }

  const Icon = iconMap[type]
  return <Icon className={cx(IconStyle({ variant }), className)} />
}
