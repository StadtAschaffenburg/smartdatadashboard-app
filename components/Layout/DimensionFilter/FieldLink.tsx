import { MouseEvent } from 'react'
import { trackEvent } from 'fathom-client'
import { cx } from 'class-variance-authority'
import Button from '@/components/Elements/Button'
import { ButtonVariant } from '@/utils/variants/ButtonVariants'
import { ActionFieldsType } from '@/mapping/ActionDimensionsMapping'
import { ActionFieldsIconMap } from '@/mapping/ActionFieldsMapping'

function getFieldIcon(field: ActionFieldsType) {
  return ActionFieldsIconMap[field as keyof typeof ActionFieldsIconMap]
}

export type LinkProps = {
  actionField: ActionFieldsType
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
  variant: ButtonVariant
}

export default function LinkComponent({
  actionField,
  active,
  ariaLabel,
  title,
  link,
  onClick,
  className,
  variant,
}: LinkProps) {
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    trackEvent(`Action Field clicked: ${title || link}`)
    event.preventDefault()
    onClick(event)
  }

  const Icon = getFieldIcon(actionField)

  return (
    <Button
      aria-label={ariaLabel || title || link}
      className={cx(
        className,
        'flex-grow self-stretch flex items-center justify-center text-center',
        active ? 'active' : '',
      )}
      href={link}
      Icon={
        Icon ? <Icon className={cx('h-6 md:h-8', 'transition-colors')} /> : null
      }
      onClick={handleClick}
      size="filter_fields"
      variant={variant}
    >
      {title}
    </Button>
  )
}
