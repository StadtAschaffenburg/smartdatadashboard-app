export const ButtonVariants = {
  variant: {
    primary: 'border-primary text-primary fill-primary stroke-primary',
    secondary:
      'border-secondary text-secondary fill-secondary stroke-secondary',
    live: 'border-primary',
    ecology: 'border-ecology text-ecology fill-ecology stroke-ecology',
    society: 'border-society text-society fill-society stroke-society',
    economy: 'border-economy text-economy fill-economy stroke-economy',
    inverse: 'text-white border-white text-white',
    danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
    overlay: 'border-secondary text-white',
    barebone: '',
    inherit: 'border-inherit text-inherit',
  },
  size: {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-md',
    lg: 'py-3 px-5 text-lg',
    link: 'pr-6 md:pr-10 pl-5 md:pl-8 py-2 md:py-3 text-xl md:text-2xl',
    main_menu: 'py-3 px-5 text-lg min-h-12',
    filter_dimensions:
      'py-3 px-5 text-xl lg:text-2xl min-h-24 w-full border-0 shadow',
    filter_fields: 'py-3 px-5 text-lg min-h-16 w-full h-full',
  },
  hover: {
    primary:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-primary',
    secondary: '',
    live: '',
    ecology:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-ecology',
    society:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-society',
    economy:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-economy',
    inverse: 'hover:text-primary hover:border-white hover:bg-white',
    danger: '',
    overlay: '',
    barebone: '',
    inherit: '',
  },
  active: {
    primary: '',
    secondary: '',
    live: '',
    ecology:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-ecology',
    society:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-society',
    economy:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-economy',
    inverse:
      '[.active_&]:text-primary [.active_&]:border-white [.active_&]:bg-white',
    danger: '',
    overlay: '',
    barebone: '',
    inherit: '',
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
