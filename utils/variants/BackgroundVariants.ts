import { cva } from 'class-variance-authority'

export const BackgroundVariants = {
  variant: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    red: 'bg-red',
    green: 'bg-green',
    blue: 'bg-blue',
    purple: 'bg-purple',
    orange: 'bg-orange',
    glacial: 'bg-glacial',
    brown: 'bg-brown',
    pink: 'bg-pink',
    yellow: 'bg-yellow',
    inverse: 'bg-white',
    dark: 'bg-black',
    white: 'bg-white',
    inherit: 'bg-inherit',
    light: 'bg-light',
    black: 'bg-black',
    neutral: 'bg-neutral-500',
    ivory: 'bg-ivory',
  },
}

export const BackgroundLightVariants = {
  variant: {
    primary: 'bg-primary-light',
    secondary: 'bg-secondary-light',
    red: 'bg-red-light',
    green: 'bg-green-light',
    blue: 'bg-blue-light',
    purple: 'bg-purple-light',
    orange: 'bg-orange-light',
    glacial: 'bg-glacial-light',
    brown: 'bg-brown',
    pink: 'bg-pink',
    yellow: 'bg-yellow',
    inverse: 'bg-white',
    dark: 'bg-black',
    white: 'bg-white',
    inherit: 'bg-inherit',
    light: 'bg-gray-100',
    black: 'bg-neutral-500',
    neutral: 'bg-neutral-100',
    ivory: 'bg-ivory',
  },
}

export const BackgroundVariantsHover = {
  variant: {
    primary: 'hover:bg-primary',
    secondary: 'hover:bg-secondary',
    red: 'hover:bg-red',
    green: 'hover:bg-green',
    blue: 'hover:bg-blue',
    purple: 'hover:bg-purple',
    orange: 'hover:bg-orange',
    glacial: 'hover:bg-glacial',
    brown: 'hover:bg-brown',
    pink: 'hover:bg-pink',
    yellow: 'hover:bg-yellow',
    inverse: 'hover:bg-white',
    dark: 'hover:bg-black',
    white: 'hover:bg-white',
    inherit: 'hover:bg-inherit',
    light: 'hover:bg-gray-300',
    black: 'hover:bg-black',
    neutral: 'hover:bg-neutral-500',
    ivory: 'hover:bg-ivory',
  },
} as const

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
