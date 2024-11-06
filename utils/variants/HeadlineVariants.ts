export const HeadlineVariants = {
  as: {
    h1: 'text-5xl lg:text-headline lg:leading-[5.5rem]',
    h2: 'text-3xl lg:text-4xl lg:leading-[3.5rem] lg:tracking-tight',
    h3: 'text-2xl lg:text-3xl lg:leading-[3rem]',
    h4: 'text-xl lg:text-2xl lg:leading-[36px]',
    h5: 'text-base lg:text-xl lg:leading-6 lg:tracking-wide',
    h6: 'text-base lg:text-lg lg:tracking-wide',
    h7: 'text-base leading-7 tracking-wide',
    h8: 'text-sm leading-5 tracking-wide',
    subtitle: 'text-lg lg:text-xl',
  },
} as const

export type HeadlineVariant = keyof typeof HeadlineVariants.as

export const HeadlineHeadlineVariants: { as: HeadlineVariant } = {
  as: 'h1',
}
