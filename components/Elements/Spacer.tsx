import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const spacer = cva('', {
  variants: {
    size: {
      xs: 'h-2',
      sm: 'h-4',
      md: 'h-8',
      lg: 'h-12',
      xl: 'h-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SpacerProps = VariantProps<typeof spacer>

/**
 *
 * @param SpacerProps size of the spacer
 * @returns A spacer to create some space 🧑‍🚀
 */
export function Spacer({ size }: SpacerProps) {
  return <div className={spacer({ size })}></div>
}
