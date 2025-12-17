import { cva } from 'class-variance-authority'

export const TextVariants = {
  variant: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    red: 'text-red',
    green: 'text-green',
    blue: 'text-blue',
    purple: 'text-purple',
    orange: 'text-orange',
    glacial: 'text-glacial',
    brown: 'text-brown',
    pink: 'text-pink',
    yellow: 'text-yellow',
    inverse: 'text-white',
    dark: 'text-black',
    white: 'text-white',
    inherit: 'text-inherit',
    light: 'text-light',
    black: 'text-black',
    neutral: 'text-neutral-500',
    ivory: 'text-ivory',
  },
} as const

export const TextVariantsHover = {
  variant: {
    primary: 'hover:text-primary',
    secondary: 'hover:text-secondary',
    red: 'hover:text-red',
    green: 'hover:text-green',
    blue: 'hover:text-blue',
    purple: 'hover:text-purple',
    orange: 'hover:text-orange',
    glacial: 'hover:text-glacial',
    brown: 'hover:text-brown',
    pink: 'hover:text-pink',
    yellow: 'hover:text-yellow',
    inverse: 'hover:text-white',
    dark: 'hover:text-black',
    white: 'hover:text-white',
    inherit: 'hover:text-inherit',
    light: 'hover:text-light',
    black: 'hover:text-black',
    neutral: 'hover:text-neutral-500',
    ivory: 'hover:text-ivory',
  },
} as const

export type TextVariant = keyof typeof TextVariants.variant

export const TextDefaultVariants: { variant: TextVariant } = {
  variant: 'primary',
}

export const TextStyle = cva('', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})
