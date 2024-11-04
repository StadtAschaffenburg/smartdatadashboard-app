export const ButtonVariants = {
  variant: {
    primary: 'border-primary text-primary',
    secondary: 'border-secondary text-secondary',
    inverse: 'text-white border-white',
    danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
    goToLive: 'border-primary text-primary',
    goToEcology: 'border-ecology text-primary',
    goToSociety: 'border-society text-primary',
    goToEconomy: 'border-economy text-primary',
    overlay: 'border-secondary text-white',
  },
  size: {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-md',
    lg: 'py-3 px-5 text-lg',
    link: 'pr-6 md:pr-10 pl-5 md:pl-8 py-2 md:py-3 text-xl md:text-2xl',
  },
  hover: {
    primary: 'hover:border-primary',
    secondary: 'hover:border-primary',
    live: 'hover:border-primary',
    ecology: 'hover:border-ecology',
    society: 'hover:border-society',
    economy: 'hover:border-economy',
  },
} as const

export type ButtonVariant = keyof typeof ButtonVariants.variant
export type ButtonSize = keyof typeof ButtonVariants.size

export const ButtonDefaultVariants: {
  variant: ButtonVariant
  size: ButtonSize
} = {
  variant: 'primary',
  size: 'md',
}
