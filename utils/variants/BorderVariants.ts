export const BorderVariants = {
  variant: {
    primary: 'border-primary',
    secondary: 'border-secondary',
    red: 'border-red',
    green: 'border-green',
    blue: 'border-blue',
    purple: 'border-purple',
    orange: 'border-orange',
    glacial: 'border-glacial',
    brown: 'border-brown',
    pink: 'border-pink',
    yellow: 'border-yellow',
    inverse: 'border-white',
    dark: 'border-black',
    white: 'border-white',
    inherit: 'border-inherit',
    light: 'border-gray-300',
    black: 'border-black',
    neutral: 'border-neutral-500',
    ivory: 'border-ivory',
  },
} as const

export const BorderVariantsRight = {
  variant: {
    primary: 'border-r-primary',
    secondary: 'border-r-secondary',
    red: 'border-r-red',
    green: 'border-r-green',
    blue: 'border-r-blue',
    purple: 'border-r-purple',
    orange: 'border-r-orange',
    glacial: 'border-r-glacial',
    brown: 'border-r-brown',
    pink: 'border-r-pink',
    yellow: 'border-r-yellow',
    inverse: 'border-r-white',
    dark: 'border-r-black',
    white: 'border-r-white',
    inherit: 'border-r-inherit',
    light: 'border-r-gray-300',
    black: 'border-r-black',
    neutral: 'border-r-neutral-500',
    ivory: 'border-r-ivory',
  },
} as const

export const BorderVariantsBottom = {
  variant: {
    primary: 'border-b-primary',
    secondary: 'border-b-secondary',
    red: 'border-b-red',
    green: 'border-b-green',
    blue: 'border-b-blue',
    purple: 'border-b-purple',
    orange: 'border-b-orange',
    glacial: 'border-b-glacial',
    brown: 'border-b-brown',
    pink: 'border-b-pink',
    yellow: 'border-b-yellow',
    inverse: 'border-b-white',
    dark: 'border-b-black',
    white: 'border-b-white',
    inherit: 'border-b-inherit',
    light: 'border-b-gray-300',
    black: 'border-b-black',
    neutral: 'border-b-neutral-500',
    ivory: 'border-b-ivory',
  },
} as const

export type BorderVariantType = keyof typeof BorderVariants.variant

export const BorderDefaultVariants: { variant: BorderVariantType } = {
  variant: 'light',
}
