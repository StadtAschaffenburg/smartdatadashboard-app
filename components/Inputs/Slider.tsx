'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Text from '../Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof BackgroundStyle> & {
    labels?: string[]
    firstValueMobile?: number
    className?: string
  }

export default function Slider({
  firstValueMobile,
  labels,
  variant = 'primary',
  className,
  ...props
}: SliderProps) {
  const [value, setValue] = useState<number>(firstValueMobile || 0)

  return (
    <div className={`slider-component ${className}`}>
      <div className="flex w-full items-center">
        {labels && (
          <div className="block md:hidden">
            <Text as="h5" className="mr-2" variant={variant}>
              {labels[value]}
            </Text>
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
              'md:h-9" block aspect-square h-6 touch-pan-x rounded-full bg-primary shadow shadow-primary',
            )}
          />
        </SliderPrimitive.Root>
      </div>
      {labels &&
        (labels.length != 12 ? (
          <div className="mt-3 hidden w-full justify-between md:flex">
            {labels.map((l, i) => (
              <Text as={'h6'} key={i} tag={'span'} variant={variant}>
                {l}
              </Text>
            ))}
          </div>
        ) : (
          <div className="mt-3 hidden w-full justify-between md:flex">
            {labels.map((l, i) => (
              <Text as={'h8'} key={i} tag={'span'} variant={variant}>
                {l}
              </Text>
            ))}
          </div>
        ))}
    </div>
  )
}
