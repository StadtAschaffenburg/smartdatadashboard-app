'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Title from '../Elements/Title'
import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'

const sliderStyle = cva(
  'relative h-3 md:h-5 flex-1 rounded-full bg-opacity-20',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        mobility: 'bg-mobility',
        successStory: 'bg-secondary',
        climate: 'bg-climate',
        energy: 'bg-energy',
        buildings: 'bg-buildings',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof sliderStyle> & {
    labels?: string[]
    firstValueMobile?: number
  }

export default function Slider({
  firstValueMobile,
  labels,
  variant,
  ...props
}: SliderProps) {
  const [value, setValue] = useState<number>(firstValueMobile || 0)

  return (
    <div>
      <div className="flex w-full items-center">
        {labels && (
          <div className="block md:hidden">
            <Title as="h5" className="mr-2" variant={'primary'}>
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
          <SliderPrimitive.Track className={sliderStyle({ variant })} />
          <SliderPrimitive.Thumb className="block aspect-square h-6 touch-pan-x rounded-full bg-primary shadow shadow-primary md:h-9" />
        </SliderPrimitive.Root>
      </div>
      {labels &&
        (labels.length != 12 ? (
          <div className="mt-3 hidden w-full justify-between md:flex">
            {labels.map((l, i) => (
              <Title as={'h5'} key={i} variant={'primary'}>
                {l}
              </Title>
            ))}
          </div>
        ) : (
          <div className="mt-3 hidden w-full justify-between md:flex">
            {labels.map((l, i) => (
              <Title as={'h8'} key={i} variant={'primary'}>
                {l}
              </Title>
            ))}
          </div>
        ))}
    </div>
  )
}
