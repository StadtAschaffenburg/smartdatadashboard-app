import { MouseEvent } from 'react'
import { trackEvent } from 'fathom-client'
import { cx } from 'class-variance-authority'
import { ActionDimensionsType } from '@/mapping/ActionDimensionsMapping'
import Button from '@/components/Elements/Button'
import { TileVariantLookup } from '@/utils/variants/TileVariants'
import { ButtonVariant } from '@/utils/variants/ButtonVariants'

export const dimensionBackgroundVariants = {
  variant: {
    ecology: 'bg-mosque [&.active]:hover:text-mosque-light',
    society: 'bg-purple [&.active]:hover:text-purple-light',
    economy: 'bg-orange [&.active]:hover:text-orange-light',
  },
}

export const getVariantClass = (
  actionDimension: ActionDimensionsType,
): string => {
  return cx(
    'bg-opacity-35 text-white [.active_&]:bg-opacity-100 hover:bg-opacity-100 flex-grow md:hover:scale-105 transition-all flex items-center justify-center',
    dimensionBackgroundVariants.variant[actionDimension] || '',
  )
}

export type LinkProps = {
  actionDimension: ActionDimensionsType
  active?: boolean
  ariaLabel?: string
  title?: string
  className?: string
  link: string
  onClick: (
    _event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void
}

export default function LinkComponent({
  actionDimension,
  active,
  ariaLabel,
  title,
  link,
  onClick,
  className,
}: LinkProps) {
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    trackEvent(`Action Dimension clicked: ${title || link}`)
    event.preventDefault()
    onClick(event)
  }

  const variant = TileVariantLookup[
    actionDimension as ActionDimensionsType
  ] as ButtonVariant

  return (
    <Button
      aria-label={ariaLabel || title || link}
      className={cx(
        className,
        getVariantClass(actionDimension),
        active ? 'active' : '',
      )}
      href={link}
      onClick={handleClick}
      size="filter_dimensions"
      variant={variant}
    >
      {title}
    </Button>
  )
}
