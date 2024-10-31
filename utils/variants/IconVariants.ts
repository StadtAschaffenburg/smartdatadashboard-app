export const IconVariants = {
  variant: {
    primary: 'stroke-primary text-primary',
    secondary: 'stroke-secondary text-secondary',
    ecology: 'stroke-ecology text-ecology',
    society: 'stroke-society text-society',
    economy: 'stroke-economy text-economy',
    eistage: 'stroke-primary text-primary',
    frosttage: 'stroke-primary text-primary',
    heisse_tage: 'stroke-primary text-primary',
    sommertage: 'stroke-primary text-primary',
    tropennaechte: 'stroke-primary text-primary',
  },
} as const

export type IconVariant = keyof typeof IconVariants.variant

export const IconDefaultVariants: { variant: IconVariant } = {
  variant: 'primary',
}
