import { cva } from 'class-variance-authority'

export const ContainerVariants = {
  variant: {
    default: 'py-4 md:py-16',
    flat: 'py-0',
    compact: 'py-4 md:py-8',
    large: 'py-4 md:py-24',
  },
} as const

export type ContainerVariant = keyof typeof ContainerVariants.variant

export const IconDefaultVariants: { variant: ContainerVariant } = {
  variant: 'default',
}

export const ContainerStyle = cva(
  'w-full mx-auto max-w-[1920px] px-4 xs:px-6 md:px-12 xl:px-32 overflow-hidden',
  {
    variants: ContainerVariants,
    defaultVariants: IconDefaultVariants,
  },
)
