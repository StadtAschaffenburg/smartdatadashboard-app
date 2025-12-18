import { cx } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  ContainerStyle,
  ContainerVariant,
} from '@/utils/variants/ContainerVariants'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ContainerVariant
}

export default function Container({
  className,
  children,
  variant = 'default',
  ...props
}: ContainerProps) {
  return (
    <div className={cx(ContainerStyle({ variant }), className)} {...props}>
      {children}
    </div>
  )
}
