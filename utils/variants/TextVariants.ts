import { cva } from 'class-variance-authority'

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
    blue: 'text-primary-medium',
    green: 'text-green',
    purple: 'text-purple',
    white: 'text-white',
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
