export const HeadlineVariants = {
  as: {
    h1: 'text-4xl lg:text-5xl leading-tight',
    h2: 'text-3xl lg:text-4xl leading-tight',
    h3: 'text-2xl lg:text-3xl leading-tight',
    h4: 'text-xl lg:text-2xl leading-tight',
    h5: 'text-base lg:text-xl leading-tight',
    h6: 'text-base lg:text-lg leading-tight',
    h7: 'text-base leading-tight',
    h8: 'text-sm leading-tight',
    subtitle: 'text-lg lg:text-xl',
  },
} as const

export type HeadlineVariant = keyof typeof HeadlineVariants.as

export const HeadlineHeadlineVariants: { as: HeadlineVariant } = {
  as: 'h1',
}
