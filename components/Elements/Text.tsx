import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'
import {
  FontFamilyVariant,
  FontWeightVariant,
} from '@/utils/variants/FontVariants'
import Markdown from '@/components/Elements/Markdown'

const TextStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

type TextProps = VariantProps<typeof TextStyle> &
  HTMLAttributes<HTMLSpanElement> & {
    bold?: boolean
    markdown?: boolean
    margin?: (typeof headlineTags)[number] | 'none'
    tag?: string
    family?: FontFamilyVariant
    weight?: FontWeightVariant
  }

export const headlineTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export const validHtmlTags = [...headlineTags, 'span', 'div'] as const

type ValidHtmlTag = (typeof validHtmlTags)[number]

const getValidTag = (tag: string | null | undefined): ValidHtmlTag => {
  return validHtmlTags.includes(tag as ValidHtmlTag)
    ? (tag as ValidHtmlTag)
    : 'div'
}

export default function Text({
  as,
  bold,
  markdown,
  family,
  variant,
  weight,
  children,
  className,
  margin = 'none',
  tag = 'div',
  ...props
}: TextProps) {
  const Tag = getValidTag(tag)

  weight = bold ? 'bold' : weight

  return (
    <Tag
      {...props}
      className={cx(
        className,
        TextStyle({ as, variant, family, weight, margin }),
      )}
      style={{ ...props.style }}
    >
      {markdown ? (
        <Markdown content={children as string} defaultClasses="" />
      ) : (
        children
      )}
    </Tag>
  )
}
