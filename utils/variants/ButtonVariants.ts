import { BackgroundVariantsHover } from './BackgroundVariants'
import { TextVariants, TextVariantsHover } from '@/utils/variants/TextVariants'
import { BorderVariants } from '@/utils/variants/BorderVariants'
import { cx } from 'class-variance-authority'

const default_dark_classes =
  '[&.active]:text-primary [.active_&]:stroke-white hover:text-primary'
const default_light_classes =
  '[&.active]:text-white [&.active]:stroke-dark hover:border-dark hover:text-white'

export const ActiveVariants = {
  variant: {
    primary: cx(default_light_classes, '[&.active]:bg-primary'),
    secondary: cx(default_light_classes, '[&.active]:bg-secondary'),
    mosque: cx(default_light_classes, '[&.active]:bg-mosque'),
    red: cx(default_light_classes, '[&.active]:bg-red'),
    green: cx(default_light_classes, '[&.active]:bg-green'),
    blue: cx(default_light_classes, '[&.active]:bg-blue'),
    purple: cx(default_light_classes, '[&.active]:bg-purple'),
    orange: cx(default_light_classes, '[&.active]:bg-orange'),
    glacial: cx(default_light_classes, '[&.active]:bg-glacial'),
    brown: cx(default_light_classes, '[&.active]:bg-brown'),
    pink: cx(default_light_classes, '[&.active]:bg-pink'),
    yellow: cx(default_light_classes, '[&.active]:bg-yellow'),
    inverse: cx(default_light_classes, '[&.active]:bg-white'),
    black: cx(default_light_classes, '[&.active]:bg-black'),
    neutral: cx(default_light_classes, '[&.active]:bg-neutral-500'),
    dark: cx(default_light_classes, '[&.active]:bg-black'),
    white: cx(default_dark_classes, '[&.active]:bg-white'),
    light: cx(default_dark_classes, '[&.active]:bg-light'),
    ivory: cx(default_dark_classes, '[&.active]:bg-ivory'),
  },
} as const

export type ActiveVariantsType = typeof ActiveVariants

type Variants = { variant: Record<string, string> }

export function mergeVariants<T extends Variants[]>(...sources: T) {
  type VariantKeys = keyof T[number]['variant']
  const merged: Record<VariantKeys & string, string> = {} as any

  const all_keys = new Set(sources.flatMap(src => Object.keys(src.variant)))

  all_keys.forEach(key => {
    merged[key as VariantKeys & string] = sources
      .map(src => src.variant[key] || '')
      .join(' ')
      .trim()
  })

  return { variant: merged }
}

export type ButtonVariantsType = {
  variant: Record<string, string>
  size: Record<string, string>
}

export const ButtonVariants: ButtonVariantsType = {
  variant: (() => {
    // default
    const bg = mergeVariants(
      ActiveVariants,
      TextVariants,
      BorderVariants,
      BackgroundVariantsHover,
    ).variant

    return {
      ...bg,
    }
  })(),
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
