import { cva } from 'class-variance-authority'

export const IconVariants = {
  variant: {
    primary: 'fill-primary stroke-primary text-primary',
    secondary: 'fill-secondary stroke-secondary text-secondary',
    live: 'fill-primary stroke-primary text-primary',
    ecology: 'fill-ecology stroke-ecology text-ecology',
    society: 'fill-society stroke-society text-society',
    economy: 'fill-economy stroke-economy text-economy',
    green: 'fill-green stroke-green text-green',
    purple: 'fill-purple stroke-purple text-purple',
  },
} as const

export type IconVariant = keyof typeof IconVariants.variant

export const IconDefaultVariants: { variant: IconVariant } = {
  variant: 'primary',
}

export const IconStyle = cva('', {
  variants: IconVariants,
  defaultVariants: IconDefaultVariants,
})
