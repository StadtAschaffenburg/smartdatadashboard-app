import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariants } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

// import all icons
import {
  IconBiomass,
  IconBusAbgas,
  IconBusElektro,
  IconLanterns,
  IconPv,
  IconRecycling,
  IconStadtwerkeAbgas,
  IconStadtwerkeElektro,
  IconWater,
} from '@/components/Icons/Ecology'
import { IconBirth, IconDeath, IconPeople } from '@/components/Icons/Social'
import {
  IconHotel,
  IconServiceA,
  IconServiceD,
} from '@/components/Icons/Economy'
import { StadtAbMap } from '@/components/Icons/Misc'

import {
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongRightIcon as ArrowRight,
} from '@heroicons/react/24/outline'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: keyof typeof TileVariants.variant
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
