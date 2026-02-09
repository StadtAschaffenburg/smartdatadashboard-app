export const FontVariants = {
  family: {
    sans: 'font-sans',
    condensed: 'font-condensed',
  },
  weight: {
    medium: 'font-medium',
    normal: 'font-normal',
    semibold: 'font-bold',
    bold: 'font-bold',
  },
} as const

export type FontFamilyVariant = keyof typeof FontVariants.family
export type FontWeightVariant = keyof typeof FontVariants.weight

export const FontDefaultVariants: { family: FontFamilyVariant, weight: FontWeightVariant } = {
  family: 'sans',
  weight: 'medium',
}