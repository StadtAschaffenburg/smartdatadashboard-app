export const FontVariants = {
  font: {
    medium: 'font-medium',
    normal: 'font-normal',
    bold: 'font-bold',
    semibold: 'font-semibold',
  },
} as const

export type FontVariant = keyof typeof FontVariants.font

export const FontDefaultVariants: { font: FontVariant } = {
  font: 'medium',
}
