import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'

const TitleStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  font,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <span
      {...props}
      className={cx(TitleStyle({ as, variant, font }), className)}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </span>
  )
}
