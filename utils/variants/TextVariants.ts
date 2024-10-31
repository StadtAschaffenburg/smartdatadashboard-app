export const TextVariants = {
  variant: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    live: 'text-primary',
    ecology: 'text-ecology',
    society: 'text-society',
    economy: 'text-economy',
    data: 'text-data',
    inverse: 'text-white',
    dark: 'text-zinc-900',
    eistage: 'text-primary-medium',
    frosttage: 'text-primary',
    heisse_tage: 'text-economy',
    sommertage: 'text-green',
    tropennaechte: 'text-purple',
  },
} as const

export type TextVariant = keyof typeof TextVariants.variant

export const TextDefaultVariants: { variant: TextVariant } = {
  variant: 'primary',
}
