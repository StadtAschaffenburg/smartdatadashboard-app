import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'
import Text from './Text'

const TitleStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <Text
      as={as}
      className={className}
      tag={as as string}
      variant={variant}
      {...props}
    >
      {children}
    </Text>
  )
}
