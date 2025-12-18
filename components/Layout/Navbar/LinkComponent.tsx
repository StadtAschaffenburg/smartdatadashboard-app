import { MouseEvent } from 'react'
import { ButtonSize, ButtonVariant } from '@/utils/variants/ButtonVariants'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { trackEvent } from 'fathom-client'
import Text from '@/components/Elements/Text'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Button from '@/components/Elements/Button'

export type LinkProps = {
  ariaLabel?: string
  title?: string
  className?: string
  icon?: React.ComponentType<any>
  link: string
  variant?: ButtonVariant
  hover?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  IconClass?: string
  preventDefault?: boolean
}

export default function LinkComponent({
  ariaLabel,
  title,
  link,
  onClick,
  className,
  preventDefault,
  size = 'md',
  icon,
  IconClass,
  variant = 'primary',
}: LinkProps) {
  const Icon = icon
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    trackEvent(`Link clicked: ${title || link}`)

    if (onClick) {
      onClick()

      if (preventDefault) {
        event.preventDefault()
      }
    }
  }

  return (
    <Button
      aria-label={ariaLabel || title || link}
      className={className}
      href={link}
      Icon={
        Icon ? <Icon className={cx(IconClass, 'transition-colors')} /> : null
      }
      onClick={handleClick}
      size={size}
      variant={variant}
    >
      {title}
    </Button>
  )
}
