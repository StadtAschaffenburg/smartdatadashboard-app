import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariants } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'

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
import { IconPeople } from '@/components/Icons/Social'
import {
  IconHotel,
  IconServiceA,
  IconServiceD,
} from '@/components/Icons/Economy'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: keyof typeof TileVariants.variant
}

const iconMap: Record<string, React.FC<{ className: string }>> = {
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
}

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
    console.warn(`Unknown icon type: ${type}`) // Warnung bei unbekanntem Typ
    return <></>
  }

  const Icon = iconMap[type]
  return <Icon className={cx(IconStyle({ variant }), className)} />
}
