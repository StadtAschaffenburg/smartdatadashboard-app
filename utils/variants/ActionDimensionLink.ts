import { cva, cx } from 'class-variance-authority'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export const defaultBackgroundClasses =
  'bg-opacity-35 text-white [.active_&]:bg-opacity-100 hover:bg-opacity-100'

export const BackgroundVariants = {
  variant: {
    ecology: 'bg-ecology [.active_&]:hover:text-ecology-light',
    society: 'bg-society [.active_&]:hover:text-society-light',
    economy: 'bg-economy [.active_&]:hover:text-economy-light',
  },
}

export const BackgroundStyle = cva('', {
  variants: BackgroundVariants,
})

export const getVariantClass = (variant: ActionDimensionsType): string => {
  return cx(defaultBackgroundClasses, BackgroundVariants.variant[variant])
}
