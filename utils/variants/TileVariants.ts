import { HeadlineVariants } from '@/utils/variants/HeadlineVariants'
import { TextVariants } from '@/utils/variants/TextVariants'
import { FontVariant, FontVariants } from '@/utils/variants/FontVariants'

export const TileVariants = {
  as: HeadlineVariants.as,
  variant: TextVariants.variant,
  font: FontVariants.font,
} as const

export const TileDefaultVariants: { font: FontVariant } = {
  font: 'medium',
}
