import Link from 'next/link'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import { MsKlimadashboardIconsNaviInfoI } from '../Icons/Navigation'

const style = cva('flex cursor-pointer items-center gap-1 md:gap-3', {
  variants: {
    variant: {
      primary: 'text-primary',
      inverse: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type MoreDetailsProps = VariantProps<typeof style> & {
  link?: string
  className?: string
  label?: string
  lessDetails?: boolean
  onClick?: () => void
  title?: string
}

export default function MoreDetails({
  link,
  variant,
  className,
  label,
  lessDetails,
  onClick,
  title = '',
}: MoreDetailsProps) {
  const Details = (
    <button
      aria-label={`Mehr Details zu ${title}`}
      className={cx(
        'transition-all hover:text-secondary font-bold',
        style({ variant }),
        className,
      )}
      onClick={event => {
        if (!link) {
          event.preventDefault()
        }
        onClick?.()
      }}
    >
      <MsKlimadashboardIconsNaviInfoI className="h-6" />
      <div className="whitespace-nowrap underline">
        {lessDetails ? 'Zurück' : label || 'Mehr Details'}
      </div>
    </button>
  )

  if (!link) {
    return Details
  }

  return <Link href={link}>{Details}</Link>
}
