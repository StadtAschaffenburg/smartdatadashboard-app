import {
  BackgroundVariants,
  BackgroundVariantsHover,
} from './BackgroundVariants'
import { TextVariants, TextVariantsHover } from '@/utils/variants/TextVariants'
import { BorderVariants } from '@/utils/variants/BorderVariants'
import { cx } from 'class-variance-authority'

const default_light_classes =
  '[.active_&]:bg-white [&.active]:text-white [&.active]:border-white [.active_&]:stroke-white'
const default_dark_classes =
  '[.active_&]:bg-dark [&.active]:text-dark [&.active]:border-dark [.active_&]:stroke-dark'

export const ActiveVariants = {
  variant: {
    primary: '',
    secondary: '',
    red: cx(default_light_classes, '[.active_&]:text-red [&.active]:bg-red'),
    green: cx(
      default_light_classes,
      '[.active_&]:text-green [&.active]:bg-green',
    ),
    blue: cx(default_light_classes, '[.active_&]:text-blue [&.active]:bg-blue'),
    purple: cx(
      default_light_classes,
      '[.active_&]:text-purple [&.active]:bg-purple',
    ),
    orange: cx(
      default_light_classes,
      '[.active_&]:text-orange [&.active]:bg-orange',
    ),
    glacial: cx(
      default_light_classes,
      '[.active_&]:text-glacial [&.active]:bg-glacial',
    ),
    brown: cx(
      default_light_classes,
      '[.active_&]:text-brown [&.active]:bg-brown',
    ),
    pink: cx(default_light_classes, '[.active_&]:text-pink [&.active]:bg-pink'),
    yellow: cx(
      default_light_classes,
      '[.active_&]:text-yellow [&.active]:bg-yellow',
    ),
    inverse: cx(
      default_light_classes,
      '[.active_&]:text-white [&.active]:bg-primary',
    ),
    black: cx(default_light_classes, '[.active_&]:bg-black'),
    neutral: cx(default_light_classes, '[.active_&]:bg-neutral-500'),
    dark: cx(default_light_classes, '[.active_&]:bg-dark'),
    white: cx(default_dark_classes, '[.active_&]:bg-white'),
    light: cx(default_dark_classes, '[.active_&]:bg-light'),
    ivory: cx(default_dark_classes, '[.active_&]:bg-ivory'),
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
    const white = cx(TextVariantsHover.variant.white, 'border-b-4 bg-white')
    const dark = cx(
      TextVariants.variant.white,
      TextVariantsHover.variant.dark,
      BackgroundVariantsHover.variant.ivory,
    )

    // default
    const bg = mergeVariants(
      ActiveVariants,
      BorderVariants,
      BackgroundVariantsHover,
    ).variant
    const merged = Object.fromEntries(
      Object.entries(bg).map(([k, v]) => [k, `${v} ${white}`]),
    )

    // inverted variants
    const bg_inverted = mergeVariants(
      ActiveVariants,
      BackgroundVariants,
    ).variant
    const inverted = Object.fromEntries(
      Object.entries(bg_inverted).map(([k, v]) => [
        `${k}_inverted`,
        `${v} ${dark}`,
      ]),
    )

    return {
      ...merged,
      ...inverted,
    }
  })(),
  size: {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-md',
    lg: 'py-3 px-5 text-lg',
    link: 'pr-6 md:pr-10 pl-5 md:pl-8 py-2 xl:py-3 text-xl xl:text-2xl',
    main_menu: 'py-1 xl:py-3 px-3 xl:px-5  text-lg min-h-12',
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
  variant: 'ivory',
  size: 'md',
}
