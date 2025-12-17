import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'
import Text, { headlineTags } from './Text'
import {
  FontFamilyVariant,
  FontWeightVariant,
} from '@/utils/variants/FontVariants'
import { cx } from 'class-variance-authority'

export const TileStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

export type TileStyleProps = VariantProps<typeof TileStyle>

type TitleProps = TileStyleProps &
  HTMLAttributes<HTMLSpanElement> & {
    family?: FontFamilyVariant
    weight?: FontWeightVariant
  }

export default function Title({
  as,
  variant,
  children,
  className,
  margin,
  family,
  weight,
  ...props
}: TitleProps) {
  margin = headlineTags.includes(
    (margin ?? as) as (typeof headlineTags)[number],
  )
    ? ((margin ?? as) as (typeof headlineTags)[number])
    : 'none'

  return (
    <Text
      as={as}
      bold={true}
      className={cx(className, 'word-break hyphens-auto')}
      family={family}
      margin={margin}
      style={{ hyphens: 'auto', overflowWrap: 'break-word', ...props.style }}
      tag={as as string}
      variant={variant}
      weight={weight}
      {...props}
    >
      {children}
    </Text>
  )
}
