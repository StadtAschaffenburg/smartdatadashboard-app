export const BackgroundVariants = {
  variant: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    live: 'bg-primary',
    ecology: 'bg-ecology',
    society: 'bg-society',
    economy: 'bg-economy',
    data: 'bg-secondary',
    inverse: 'bg-white',
    dark: 'bg-zinc-900',
    eistage: 'bg-primary-medium',
    frosttage: 'bg-primary',
    heisse_tage: 'bg-economy',
    sommertage: 'bg-green',
    tropennaechte: 'bg-purple',
  },
} as const

export const BackgroundLightVariants = {
  variant: {
    primary: 'bg-primary-light',
    secondary: 'bg-secondary-light',
    live: 'bg-primary-light',
    ecology: 'bg-ecology-light',
    society: 'bg-society-light',
    economy: 'bg-economy-light',
    data: 'bg-secondary-light',
    inverse: 'bg-white',
    dark: 'bg-zinc-900',
    eistage: 'bg-primary-light',
    frosttage: 'bg-primary-light',
    heisse_tage: 'bg-primary-light',
    sommertage: 'bg-primary-light',
    tropennaechte: 'bg-primary-light',
  },
} as const

export type BackgroundVariant = keyof typeof BackgroundVariants.variant

export const BackgroundDefaultVariants: { variant: BackgroundVariant } = {
  variant: 'primary',
}
