// Divider.tsx
import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import {
  BorderDefaultVariants,
  BorderVariants,
} from '@/utils/variants/BorderVariants'

const DividerSizes = {
  size: {
    'xs': 'border-t',
    'sm': 'border-t-2',
    'md': 'border-t-4',
    'lg': 'border-t-8',
    'xl': 'border-t-12',
  },
} as const

const SpacerLineStyle = cva('mt-4 pb-4', {
  variants: {
    ...BorderVariants,
    ...DividerSizes,
  },
  defaultVariants: {
    ...BorderDefaultVariants,
    size: 'sm',
  },
})

export type DividerProps = VariantProps<typeof SpacerLineStyle> & {
  title?: string
  className?: string
}

export default function Divider({
  title,
  variant,
  size,
  className = '',
}: DividerProps) {
  return (
    <div className={className}>
      <div className={SpacerLineStyle({ variant, size })} />

      {title && (
        <div className="text-sm font-bold">
          <span className="mb-2 inline-block rounded-intangible bg-gray-300 px-4 py-1 text-gray-900">
            {title}
          </span>
        </div>
      )}
    </div>
  )
}
