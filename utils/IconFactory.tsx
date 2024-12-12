import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariants } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'

// import all icons
import { IconPeople } from '@/components/Icons/Social'
import { IconHotel } from '@/components/Icons/Economy'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: keyof typeof TileVariants.variant
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
  if (!type) {
    return <></>
  }

  let Icon = (() => <></>) as React.FC<{ className: string }>

  switch (type) {
    case 'hotel':
      Icon = IconHotel
      break
    case 'people':
      Icon = IconPeople
      break
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unknown icon type: ${type}`)
  }

  return <Icon className={cx(IconStyle({ variant }), className)} />
}
