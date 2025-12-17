import { HeadlineVariants } from '@/utils/variants/HeadlineVariants'
import { TextVariants } from '@/utils/variants/TextVariants'
import {
  FontDefaultVariants,
  FontFamilyVariant,
  FontVariants,
  FontWeightVariant,
} from '@/utils/variants/FontVariants'
import { ActionFieldsColorMap } from '@/mapping/ActionFieldsMapping'

export const TileVariantLookup = ActionFieldsColorMap

export const TileVariants = {
  as: HeadlineVariants.as,
  variant: TextVariants.variant,
  family: FontVariants.family,
  weight: FontVariants.weight,
  margin: {
    none: '',
    h1: 'mb-4 lg:mb-6',
    h2: 'mb-4',
    h3: 'mb-4',
    h4: 'mb-4',
    h5: 'mb-4',
    h6: 'mb-4',
    p: 'mb-2',
  },
} as const

export type TileVariantTypes = keyof typeof TileVariants.variant

export const TileDefaultVariants: {
  family: FontFamilyVariant
  weight: FontWeightVariant
} = {
  family: FontDefaultVariants.family,
  weight: FontDefaultVariants.weight,
}
