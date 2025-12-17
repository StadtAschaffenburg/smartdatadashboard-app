import { MouseEvent } from 'react'
import { ButtonSize, ButtonVariant } from '@/utils/variants/ButtonVariants'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { trackEvent } from 'fathom-client'
import Text from '@/components/Elements/Text'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export type LinkProps = {
  ariaLabel?: string
  title?: string
  icon?: React.ComponentType<any>
  link: string
  variant?: ButtonVariant
  hover?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  LinkClass?: string
  ButtonClass?: string
  IconClass?: string
  preventDefault?: boolean
}

export default function LinkComponent({
  ariaLabel,
  title,
  link,
  onClick,
  LinkClass,
  preventDefault,
}: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(`Link clicked: ${title || link}`)

    if (onClick) {
      onClick()

      if (preventDefault) {
        event.preventDefault()
      }
    }
  }

  return (
    <Link
      aria-label={ariaLabel || title || link}
      className={cx(
        LinkClass,
        'hover:bg-primary-medium [&.active]:bg-primary-medium group border-b border-primary-light py-4 transition-colors',
      )}
      href={link}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-2 text-white transition-all">
        <div className="h-4 w-4 ml-2">
          <ChevronRightIcon className="h-full w-full object-contain" />
        </div>
        <Text family="condensed">{title}</Text>
      </div>
    </Link>
  )
}
