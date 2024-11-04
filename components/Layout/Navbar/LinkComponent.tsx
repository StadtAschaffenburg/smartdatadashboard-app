import { Button } from '@/components/Elements/Button'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { SVGProps } from 'react'

export type LinkProps = {
  title?: string
  icon?: (_props: SVGProps<SVGSVGElement>) => JSX.Element
  link: string
  variant?: 'primary' | 'inverse'
  hover?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function LinkComponent({
  title,
  link,
  icon,
  variant = 'primary',
  hover,
  onClick,
}: LinkProps) {
  const Icon = icon

  return (
    <Link href={link}>
      <Button
        hover={hover}
        onClick={onClick}
        size={'link'}
        startIcon={
          Icon ? (
            <Icon
              className={cx(
                'h-[26px] transition-colors md:h-[34px]',
                variant === 'primary' ? 'text-primary' : 'text-white',
                hover === 'primary' && 'group-hover:text-primary',
                hover === 'secondary' && 'group-hover:text-secondary',
              )}
            />
          ) : null
        }
        variant={variant}
      >
        {title}
      </Button>
    </Link>
  )
}
