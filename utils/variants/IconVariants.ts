import { cva } from 'class-variance-authority'

export const IconFillVariants = {
  primary: 'fill-primary',
  secondary: 'fill-secondary',
  red: 'fill-red',
  green: 'fill-green',
  blue: 'fill-blue',
  purple: 'fill-purple',
  orange: 'fill-orange',
  glacial: 'fill-glacial',
  brown: 'fill-brown',
  pink: 'fill-pink',
  yellow: 'fill-yellow',
  inverse: 'fill-inverse',
  dark: 'fill-dark',
  white: 'fill-white',
  inherit: 'fill-inherit',
  light: 'fill-neutral-300',
  black: 'fill-black',
  neutral: 'fill-neutral-500',
  ivory: 'fill-ivory',
} as const

export const IconStrokeVariants = {
  primary: 'stroke-primary',
  secondary: 'stroke-secondary',
  red: 'stroke-red',
  green: 'stroke-green',
  blue: 'stroke-blue',
  purple: 'stroke-purple',
  orange: 'stroke-orange',
  glacial: 'stroke-glacial',
  brown: 'stroke-brown',
  pink: 'stroke-pink',
  yellow: 'stroke-yellow',
  inverse: 'stroke-inverse',
  dark: 'stroke-dark',
  white: 'stroke-white',
  inherit: 'stroke-inherit',
  light: 'stroke-neutral-300',
  black: 'stroke-black',
  neutral: 'stroke-neutral-500',
  ivory: 'stroke-ivory',
} as const

export const IconTextVariants = {
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
  inverse: 'text-inverse',
  dark: 'text-primary',
  white: 'text-white',
  inherit: 'text-inherit',
  light: 'text-neutral-300',
  black: 'text-black',
  neutral: 'text-neutral-500',
  ivory: 'text-ivory',
} as const

export const IconVariants = {
  variant: (Object.keys(IconFillVariants) as Array<keyof typeof IconFillVariants>).reduce((acc, key) => {
    acc[key] = `${IconFillVariants[key]} ${IconStrokeVariants[key]} ${IconTextVariants[key]}`
    return acc
  }, {} as Record<keyof typeof IconFillVariants, string>),
} as const

export type IconVariant = keyof typeof IconVariants.variant

export const IconStyle = cva('', {
  variants: {
    ...IconVariants,
    fill: IconFillVariants,
    stroke: IconStrokeVariants,
    text: IconTextVariants,
  },
  defaultVariants: {},
})
