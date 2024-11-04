import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import {
  ButtonDefaultVariants,
  ButtonVariants,
} from '@/utils/variants/ButtonVariants'

import { Spinner } from '@/components/Elements/Spinner'

const button = cva(
  'flex items-center justify-center border-2 font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 group transition-colors',
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
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cx(className, button({ variant, size, hover }))}
        ref={ref}
        type={type}
        {...props}
      >
        {isLoading && <Spinner className="text-current" size="sm" />}
        {!isLoading && <div className="mr-1 md:mr-4">{startIcon}</div>}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
