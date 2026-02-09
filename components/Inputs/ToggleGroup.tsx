'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import Text from '../Elements/Text'
import { useContentWidth } from '@schleegleixner/react-statamic-api'
import {
  BorderVariants,
  BorderVariantsRight,
} from '@/utils/variants/BorderVariants'
import { BackgroundVariants } from '@/utils/variants/BackgroundVariants'
import { TextVariants } from '@/utils/variants/TextVariants'

const rootStyle = cva(
  'flex h-fit w-full border-2 bg-white',
  {
    variants: {
      ...BorderVariants,
      layout: {
        horizontal: 'rounded-sm flex-row',
        vertical: 'rounded-sm flex-col mb-6',
      },
    },

    defaultVariants: { variant: 'light', layout: 'horizontal' },
  },
)

const backgroundStyle = cva(
  'flex-1 px-4 md:px-8 md:py-2 transition-all duration-300 text-center focus-visible:outline-none focus-visible:bg-secondary focus-visible:text-white',
  {
    variants: {
      ...BackgroundVariants,
      showDivider: {
        true: 'border-r-2',
        false: '',
      },
    },
    compoundVariants: Object.entries(BorderVariantsRight.variant).map(
      ([key, value]) => ({
        variant: key as keyof typeof BorderVariantsRight.variant,
        showDivider: true as const,
        class: value,
      }),
    ),
    defaultVariants: { variant: 'primary', showDivider: false },
  },
)

const itemStyle = cva('transition-all duration-300 min-w-0', {
  variants: {
    ...BackgroundVariants,
    selected: {
      true: 'bg-opacity-100 text-white',
      false: 'bg-opacity-0',
    },
    layout: {
      horizontal: 'px-4 py-2',
      vertical: 'px-2 py-1',
    },
  },
  compoundVariants: Object.entries(TextVariants.variant).map(
    ([key, value]) => ({
      variant: key as keyof typeof TextVariants.variant,
      selected: false,
      class: value,
    }),
  ),
  defaultVariants: {
    variant: 'primary',
    selected: false,
    layout: 'horizontal',
  },
})

type ToggleValue = string | number

interface ToggleItem<T extends ToggleValue> {
  element: React.ReactNode
  value: T
}

interface ToggleGroupProps<T extends ToggleValue = string> {
  label: string
  defaultValue?: T
  items: ToggleItem<T>[]
  onChange?: (_value: T) => void
  variant?: string
}

export default function ToggleGroup<T extends ToggleValue>({
  label,
  defaultValue,
  items,
  variant = 'primary',
  onChange,
}: ToggleGroupProps<T>) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const toString = (v: T) => v.toString()
  const toOriginal = (v: string): T =>
    (typeof items[0].value === 'number' ? +v : v) as T

  useEffect(() => {
    setLayout(contentWidth < items.length * 180 ? 'vertical' : 'horizontal')
  }, [contentWidth, items.length])

  const [value, setValue] = useState<string>(
    defaultValue !== undefined
      ? toString(defaultValue)
      : toString(items[0].value),
  )

  return (
    <ToggleGroupPrimitive.Root
      aria-label={label}
      className={rootStyle({
        variant: variant as keyof typeof BorderVariants.variant,
        layout,
      })}
      onValueChange={val => {
        if (!val) {
          return
        }
        setValue(val)
        onChange?.(toOriginal(val))
      }}
      ref={elRef}
      type="single"
      value={value}
    >
      {items.map((item, idx) => {
        const valString = toString(item.value)
        const selected = valString === value

        return (
          <ToggleGroupPrimitive.Item
            className={cx(
              backgroundStyle({
                variant: variant as keyof typeof BackgroundVariants.variant,
                showDivider:
                  idx !== items.length - 1 && layout === 'horizontal',
              }),
              itemStyle({
                variant: variant as keyof typeof TextVariants.variant,
                selected,
                layout,
              }),
            )}
            key={idx}
            value={valString}
          >
            {typeof item.element === 'string' ? (
              <Text
                className="w-full overflow-hidden text-ellipsis"
                style={{ hyphens: 'unset' }}
                tag="span"
              >
                {item.element}
              </Text>
            ) : (
              item.element
            )}
          </ToggleGroupPrimitive.Item>
        )
      })}
    </ToggleGroupPrimitive.Root>
  )
}
