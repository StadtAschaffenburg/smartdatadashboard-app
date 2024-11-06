'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import Title from '../Elements/Title'
import {
  BorderDefaultVariants,
  BorderVariants,
} from '@/utils/variants/BorderVariants'

type variants = {
  primary: string
  live: string
  ecology: string
  society: string
  economy: string
}

const toggleGroupStyle = cva<{
  variant: variants
}>(
  'flex h-fit w-fit overflow-hidden rounded-full border-2 bg-white w-full md:w-auto',
  {
    variants: BorderVariants,
    defaultVariants: BorderDefaultVariants,
  },
)

const toggleGroupBackgroundStyle = cva<{
  variant: variants
  isLast: {
    true: string
  }
}>('px-4 transition-all duration-300 md:py-2 md:px-8 flex-1', {
  variants: {
    variant: BorderVariants.variant,
    isLast: {
      true: 'border-r-2',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      isLast: true,
      className: 'border-r-primary',
    },
    {
      variant: 'live',
      isLast: true,
      className: 'border-r-primary',
    },
    {
      variant: 'ecology',
      isLast: true,
      className: 'border-r-ecology',
    },
    {
      variant: 'society',
      isLast: true,
      className: 'border-r-society',
    },
    {
      variant: 'economy',
      isLast: true,
      className: 'border-r-economy',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
})

const selectedStyle = cva('px-4 transition-all duration-300 md:py-2 md:px-8', {
  variants: {
    variant: {
      primary: 'bg-primary',
      live: 'bg-primary',
      ecology: 'bg-ecology',
      society: 'bg-society',
      economy: 'bg-economy',
    },
    selected: {
      true: 'bg-opacity-100 text-white',
      false: 'bg-opacity-0',
    },
  },
  compoundVariants: [
    {
      selected: false,
      variant: 'primary',
      className: 'text-primary',
    },
    {
      selected: false,
      variant: 'live',
      className: 'text-pimary',
    },
    {
      selected: false,
      variant: 'ecology',
      className: 'text-ecology',
    },

    {
      selected: false,
      variant: 'society',
      className: 'text-society',
    },
    {
      selected: false,
      variant: 'economy',
      className: 'text-economy',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    selected: false,
  },
})

type ToggleGroupProps = VariantProps<typeof toggleGroupStyle> & {
  defaultValue?: string
  items: {
    element: string | React.ReactElement
    value: string
  }[]
  onChange?: (_value: string) => void
}

export default function ToggleGroup({
  defaultValue,
  items,
  variant,
  onChange,
}: ToggleGroupProps) {
  const [value, setValue] = useState(defaultValue || items[0].value)

  return (
    <ToggleGroupPrimitive.Root
      className={toggleGroupStyle({ variant })}
      onValueChange={value => {
        if (value) {
          setValue(value)
          onChange && onChange(value)
        }
      }}
      type="single"
      value={value}
    >
      {items.map((e, i) => (
        <ToggleGroupPrimitive.Item
          className={cx(
            toggleGroupBackgroundStyle({
              variant,
              isLast: i !== items.length - 1,
            }),
            selectedStyle({
              variant,
              selected: value === e.value,
            }),
          )}
          key={i}
          value={e.value}
        >
          {typeof e.element === 'string' ? (
            <Title as="h5" style={{ hyphens: 'unset' }}>
              {e.element}
            </Title>
          ) : (
            e.element
          )}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
