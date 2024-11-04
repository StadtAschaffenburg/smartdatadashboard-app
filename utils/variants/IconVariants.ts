export const IconVariants = {
  variant: {
    primary: 'stroke-primary text-primary',
    secondary: 'stroke-secondary text-secondary',
    ecology: 'stroke-ecology text-ecology',
    society: 'stroke-society text-society',
    economy: 'stroke-economy text-economy',
  },
} as const

export type IconVariant = keyof typeof IconVariants.variant

export const IconDefaultVariants: { variant: IconVariant } = {
  variant: 'primary',
}
