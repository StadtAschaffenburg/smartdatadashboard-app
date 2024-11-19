export const HeadlineVariants = {
  as: {
    h1: 'text-4xl lg:text-5xl',
    h2: 'text-3xl lg:text-4xl',
    h3: 'text-2xl lg:text-3xl',
    h4: 'text-xl lg:text-2xl',
    h5: 'text-base lg:text-xl',
    h6: 'text-base lg:text-lg',
    h7: 'text-base',
    h8: 'text-sm',
    subtitle: 'text-lg lg:text-xl',
    base: 'text-base',
    xl: 'text-xl lg:text-2xl',
    lg: 'text-lg lg:text-xl',
    md: 'text-base lg:text-lg',
    sm: 'text-sm lg:text-base',
    xs: 'text-xs lg:text-sm',
  },
} as const

export type HeadlineVariant = keyof typeof HeadlineVariants.as

export const HeadlineHeadlineVariants: { as: HeadlineVariant } = {
  as: 'h1',
}
