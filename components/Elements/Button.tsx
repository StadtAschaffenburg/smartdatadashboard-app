import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import {
  ButtonDefaultVariants,
  ButtonVariants,
} from '@/utils/variants/ButtonVariants'
import Spinner from '@/components/Elements/Spinner'

const button = cva(
  'flex items-center justify-center border font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 group transition-colors rounded',
  {
    variants: ButtonVariants,
    defaultVariants: ButtonDefaultVariants,
  },
)

type IconProps = {
  startIcon?: React.ReactElement | null
  endIcon?: React.ReactElement | null
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> &
  IconProps & {
    isLoading?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant,
      size,
      hover,
      active,
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    if (!active) {
      active = hover
    }
    return (
      <button
        className={cx(className, button({ variant, size, hover, active }))}
        ref={ref}
        type={type}
        {...props}
      >
        {isLoading && <Spinner className="text-current" size="sm" />}
        {!isLoading && startIcon && (
          <div className="mr-1 md:mr-2">{startIcon}</div>
        )}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
