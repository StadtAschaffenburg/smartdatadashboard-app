export const BorderVariants = {
  variant: {
    primary: 'border-primary',
    live: 'border-primary',
    ecology: 'border-ecology',
    society: 'border-society',
    economy: 'border-economy',
  },
} as const

export type BorderVariant = keyof typeof BorderVariants.variant

export const BorderDefaultVariants: { variant: BorderVariant } = {
  variant: 'primary',
}
