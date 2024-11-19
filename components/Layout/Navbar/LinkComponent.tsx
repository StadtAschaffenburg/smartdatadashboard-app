import { Button } from '@/components/Elements/Button'
import Link from 'next/link'
import { SVGProps } from 'react'
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
}: LinkProps) {
  const Icon = icon

  return (
    <Link className={LinkClass} href={link}>
      <Button
        className={ButtonClass}
        hover={hover ?? variant}
        onClick={onClick}
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
