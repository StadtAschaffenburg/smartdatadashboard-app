import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'

import { Spinner } from '@/components/Elements/Spinner'

const button = cva(
  'flex items-center justify-center rounded-full border-2 font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 group transition-colors',
  {
    variants: {
      variant: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        inverse: 'text-white border-white',
        danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
        goToClimate: 'border-climate text-primary',
        goToMobility: 'border-mobility text-primary',
        goToEnergy: 'border-energy text-primary',
        goToBuildings: 'border-buildings text-primary',
        overlay: 'border-secondary text-white'
      },
      size: {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-5 text-md',
        lg: 'py-3 px-5 text-lg',
        link: 'pr-6 md:pr-10 pl-5 md:pl-8 py-2 md:py-3 text-xl md:text-2xl',
      },
      hover: {
        climate: 'hover:border-climate',
        energy: 'hover:border-energy',
        mobility: 'hover:border-mobility',
        buildings: 'hover:border-buildings',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

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
