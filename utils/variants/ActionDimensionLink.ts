import { cva } from 'class-variance-authority'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export const BackgroundVariants = {
  variant: {
    ecology:
      'bg-ecology-light text-ecology hover:bg-ecology hover:text-white [.active_&]:bg-ecology [.active_&]:text-white [.active_&]:hover:text-ecology-light',
    society:
      'bg-society-light text-society hover:bg-society hover:text-white [.active_&]:bg-society [.active_&]:text-white [.active_&]:hover:text-society-light',
    economy:
      'bg-economy-light text-economy hover:bg-economy hover:text-white [.active_&]:bg-economy [.active_&]:text-white [.active_&]:hover:text-economy-light',
  },
}

export const BackgroundStyle = cva('', {
  variants: BackgroundVariants,
})

export const getVariantClass = (variant: ActionDimensionsType): string => {
  return BackgroundVariants.variant[variant]
}
