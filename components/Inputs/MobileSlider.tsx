'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Text from '../Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'
import SliderStepIndictor from './SliderStepIndicator'

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof BackgroundStyle> & {
    firstValueMobile?: number
    labels?: string[] | number[]
  }

export default function MobileSlider({
  firstValueMobile,
  labels,
  variant = 'primary',
  className,
  ...props
}: SliderProps) {
  const [value, setValue] = useState<number>(firstValueMobile || 0)
  const stepCount = props.max ? props.max - (props.min || 0) : 0

  return (
    <div className={`slider-component ${className ?? 'xl:hidden'}`}>
      <div className="flex w-full items-center">
        {labels && (
          <div className="block min-w-16">
            <Text as={'h6'} className={'mr-2'} tag={'span'} variant={variant}>
              {labels[value]}
            </Text>
          </div>
        )}
        <SliderPrimitive.Root
          aria-label="Zeitstrahl"
          className="relative flex h-fit w-full cursor-pointer items-center"
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
          >
            <SliderStepIndictor stepCount={stepCount} variant={variant} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cx(
              BackgroundStyle({ variant }),
              'transition:scale block aspect-square h-6 rounded-full shadow focus:scale-125 md:h-9',
            )}
          />
        </SliderPrimitive.Root>
      </div>
    </div>
  )
}
