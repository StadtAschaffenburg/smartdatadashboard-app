'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Title from '../Elements/Title'
import { cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof BackgroundStyle> & {
    firstValueMobile?: number
    labels?: string[]
  }

export default function MobileSlider({
  firstValueMobile,
  labels,
  variant = 'primary',
  className,
  ...props
}: SliderProps) {
  const [value, setValue] = useState<number>(firstValueMobile || 0)

  return (
    <div className={`slider-component ${className ?? 'xl:hidden'}`}>
      <div className="flex w-full items-center">
        {labels && (
          <div className="block">
            <Title as={'h6'} className={'mr-2'} tag={'span'} variant={variant}>
              {labels[value]}
            </Title>
          </div>
        )}
        <SliderPrimitive.Root
          aria-label="Volume"
          className="relative flex h-fit w-full items-center"
          {...props}
          onValueChange={([e]) => {
            props.onValueChange && props.onValueChange([e])
            setValue(e)
          }}
        >
          <SliderPrimitive.Track
            className={cx(
              BackgroundStyle({ variant }),
              'relative h-3 flex-1 rounded-full bg-opacity-20 md:h-5',
            )}
          />
          <SliderPrimitive.Thumb
            className={cx(
              BackgroundStyle({ variant }),
              'block aspect-square h-6 touch-pan-x rounded-full bg-primary shadow shadow-primary md:h-9',
            )}
          />
        </SliderPrimitive.Root>
      </div>
    </div>
  )
}
