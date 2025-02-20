import { cva } from 'class-variance-authority'

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
    dark: 'bg-black',
    blue: 'bg-primary-medium',
    green: 'bg-green',
    white: 'bg-white',
    inherit: 'bg-inherit',
  },
}

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
    dark: 'bg-black',
    blue: 'bg-primary-light',
    green: 'bg-green-light',
    white: 'bg-white',
    inherit: 'bg-inherit',
  },
}

export type BackgroundVariant = keyof typeof BackgroundVariants.variant

export const BackgroundDefaultVariants: { variant: BackgroundVariant } = {
  variant: 'primary',
}

export const getVariantClass = (
  variant: BackgroundVariant,
  light: boolean = false,
): string => {
  return light
    ? BackgroundLightVariants.variant[variant]
    : BackgroundVariants.variant[variant]
}

export const BackgroundStyle = cva('', {
  variants: BackgroundVariants,
  defaultVariants: BackgroundDefaultVariants,
})

export const BackgroundLightStyle = cva('', {
  variants: BackgroundLightVariants,
  defaultVariants: BackgroundDefaultVariants,
})
