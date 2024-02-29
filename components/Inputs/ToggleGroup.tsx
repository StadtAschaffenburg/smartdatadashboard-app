'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import Title from '../Elements/Title'

type variants = {
  primary: string
  mobility: string
  successStory: string
  climate: string
  building: string
}

const toggleGroupStyle = cva<{
  variant: variants
}>(
  'flex h-fit w-fit overflow-hidden rounded-full border-2 bg-white w-full md:w-auto',
  {
    variants: {
      variant: {
        primary: 'border-primary',
        mobility: 'border-mobility',
        successStory: 'border-secondary',
        climate: 'border-climate',
        building: 'border-buildings',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

const toggleGroupBackgroundStyle = cva<{
  variant: variants
  isLast: {
    true: string
  }
}>('px-4 transition-all duration-300 md:py-2 md:px-8 flex-1', {
  variants: {
    variant: {
      primary: 'bg-primary',
      mobility: 'bg-mobility',
      successStory: 'bg-secondary',
      climate: 'bg-climate',
      building: 'bg-buildings',
    },
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
      variant: 'mobility',
      isLast: true,
      className: 'border-r-mobility',
    },
    {
      variant: 'successStory',
      isLast: true,
      className: 'border-r-secondary',
    },
    {
      variant: 'climate',
      isLast: true,
      className: 'border-r-climate',
    },
    {
      variant: 'building',
      isLast: true,
      className: 'border-r-buildings',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
})

const selectedStyle = cva('px-4 transition-all duration-300 md:py-2 md:px-8', {
  variants: {
    variant: {
      primary: null,
      mobility: null,
      successStory: null,
      climate: null,
      building: null,
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
      variant: 'mobility',
      className: 'text-mobility',
    },
    {
      selected: false,
      variant: 'successStory',
      className: 'text-secondary',
    },
    {
      selected: false,
      variant: 'climate',
      className: 'text-climate',
    },
    {
      selected: false,
      variant: 'building',
      className: 'text-buildings',
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
