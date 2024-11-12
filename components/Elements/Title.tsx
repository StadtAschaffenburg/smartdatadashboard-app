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
  HTMLAttributes<HTMLSpanElement> & {
    tag?: string
  }

const validHtmlTags = [
  'span',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const

type ValidHtmlTag = (typeof validHtmlTags)[number]

const getValidTag = (tag: string | null | undefined): ValidHtmlTag => {
  return validHtmlTags.includes(tag as ValidHtmlTag)
    ? (tag as ValidHtmlTag)
    : 'span'
}

export default function Title({
  as,
  variant,
  font,
  children,
  className,
  tag,
  ...props
}: TitleProps) {
  const Tag = getValidTag(tag || as)

  return (
    <Tag
      {...props}
      className={cx(TitleStyle({ as, variant, font }), className)}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </Tag>
  )
}
