import { Button } from '@/components/Elements/Button'
import Link from 'next/link'
import { MouseEvent, SVGProps } from 'react'
import { ButtonSize, ButtonVariant } from '@/utils/variants/ButtonVariants'
import { cx } from 'class-variance-authority'

export type LinkProps = {
  title?: string
  icon?: (_props: SVGProps<SVGSVGElement>) => JSX.Element
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
  title,
  link,
  icon,
  variant = 'primary',
  hover,
  size = 'link',
  onClick,
  LinkClass,
  ButtonClass,
  IconClass,
  preventDefault,
}: LinkProps) {
  const Icon = icon

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick()
      if (preventDefault) {
        event.preventDefault()
      }
    }
  }

  return (
    <Link className={LinkClass} href={link} onClick={handleClick}>
      <Button
        className={ButtonClass}
        hover={hover ?? variant}
        size={size}
        startIcon={
          Icon ? <Icon className={cx(IconClass, 'transition-colors')} /> : null
        }
        variant={variant}
      >
        {title}
      </Button>
    </Link>
  )
}
