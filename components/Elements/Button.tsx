'use client'

import * as React from 'react'
import Link from 'next/link'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import {
  ButtonDefaultVariants,
  ButtonVariants,
} from '@/utils/variants/ButtonVariants'
import Spinner from '@/components/Elements/Spinner'

const button = cva(
  'focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 group font-medium transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary rounded border',
  {
    variants: ButtonVariants,
    defaultVariants: ButtonDefaultVariants,
  },
)
const class_names_content = 'flex items-center leading-tight'

type IconProps = {
  Icon?: React.ReactElement | React.ComponentType<{ className?: string }> | null
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof button> &
  IconProps & {
    href?: string
    inverted?: boolean
    isLoading?: boolean
  }

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { className = '', variant, size, isLoading = false, Icon, href, ...props },
    ref,
  ) => {
    const content = (
      <>
        {isLoading && <Spinner className="text-current" size="sm" />}
        {!isLoading && Icon && (
          <span className="mr-3 md:mr-4">
            {React.isValidElement(Icon) ? (
              Icon
            ) : typeof Icon === 'function' ? (
              <div className="h-8 w-8">
                <Icon className="h-full w-full object-contain" />
              </div>
            ) : null}
          </span>
        )}
        {props.children && <span>{props.children}</span>}
      </>
    )

    const class_names = cx(className, button({ variant, size }))

    if (href) {
      return (
        <Link
          className={class_names}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          <div className={class_names_content}>{content}</div>
        </Link>
      )
    }

    return (
      <button
        className={class_names}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        <div className={class_names_content}>{content}</div>
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
