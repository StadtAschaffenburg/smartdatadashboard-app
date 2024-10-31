import { BackgroundVariants } from '@/utils/variants/BackgroundVariants'

export const SwitchVariants = {
  variant: BackgroundVariants.variant,
  checked: {
    true: 'translate-x-full',
  },
} as const

export type SwitchVariant = keyof typeof SwitchVariants.variant

export const SwitchDefaultVariants: { variant: SwitchVariant } = {
  variant: 'primary',
}
