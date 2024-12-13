export const HeadlineVariants = {
  as: {
    h1: 'text-2xl md:text-3xl lg:text-4xl',
    h2: 'text-xl md:text-2xl lg:text-3xl',
    h3: 'text-lg md:text-xl lg:text-2xl',
    h4: 'text-md md:text-lg lg:text-xl',
    h5: 'text-md lg:text-lg',
    h6: 'text-base lg:text-md',
    h7: 'text-base',
    h8: 'text-sm',
    subtitle: 'text-lg lg:text-xl',
    base: 'text-base',
    xl: 'text-xl lg:text-2xl',
    lg: 'text-lg lg:text-xl',
    md: 'text-base lg:text-lg',
    sm: 'text-sm lg:text-base',
    xs: 'text-xs lg:text-sm',
    xxs: 'text-xs',
  },
} as const

export type HeadlineVariant = keyof typeof HeadlineVariants.as

export const HeadlineHeadlineVariants: { as: HeadlineVariant } = {
  as: 'h1',
}
