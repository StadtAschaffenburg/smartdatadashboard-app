'use client'

import React from 'react'
import DefaultSlider from './DefaultSlider'
import { cx, VariantProps } from 'class-variance-authority'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'
import * as SliderPrimitive from '@radix-ui/react-slider'

type SliderProps = Omit<
  SliderPrimitive.SliderProps,
  'onValueChange' | 'defaultValue' | 'value'
> &
  VariantProps<typeof BackgroundStyle> & {
    className?: string
    default_value?: number
    labels: string[] | number[]
    wide?: boolean
    onValueChange?: (_index: number) => void
  }

export default function Slider({
  labels,
  default_value,
  max,
  min = 0,
  variant = 'primary',
  onValueChange = () => {},
  className = '',
}: SliderProps) {
  const initial = default_value ?? labels.length - 1
  const max_val = max ?? initial

  const handleChange = ([new_index]: number[]) => onValueChange(new_index)

  // if only one label is provided, do not render the slider
  if (labels.length <= 1) {
    return null
  }

  return (
    <div className={cx(className)}>
      <DefaultSlider
        className={''}
        defaultValue={[initial]}
        firstValueMobile={initial}
        labels={labels}
        max={max_val}
        min={min}
        onValueChange={handleChange}
        variant={variant}
      />
    </div>
  )
}
