'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import Text from '@/components/Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'
import SliderStepIndictor from './SliderStepIndicator'
import { useContentWidth } from '@schleegleixner/react-statamic-api'

export type SliderProps = SliderPrimitive.SliderProps &
  VariantProps<typeof BackgroundStyle> & {
    labels?: string[] | number[]
    firstValueMobile?: number
    className?: string
  }

export default function DefaultSlider({
  firstValueMobile,
  labels,
  variant = 'primary',
  className,
  ...props
}: SliderProps) {
  const [value, setValue] = useState<number>(firstValueMobile || 0)
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const stepCount = props.max ? props.max - (props.min || 0) : 0

  const label_size = labels && labels.length < 10 ? 40 : 30
  const breakpoint = Math.max(
    100 + (labels ? labels.length * label_size : 0),
    420,
  )
  const mobile_view = contentWidth < breakpoint

  return (
    <div className={`slider-component ${className}`} ref={elRef}>
      <div className="flex w-full items-center">
        {labels && mobile_view && (
          <div>
            <Text as="h5" className="mr-2" tag={'span'} variant={variant}>
              {labels[value]}
            </Text>
          </div>
        )}
        <SliderPrimitive.Root
          aria-label="Zeitstrahl"
          className="relative flex h-fit w-full items-center"
          {...props}
          onValueChange={([e]: [number]) => {
            props.onValueChange && props.onValueChange([e])
            setValue(e)
          }}
        >
          <SliderPrimitive.Track
            className={cx(
              BackgroundStyle({ variant }),
              'relative flex-1 rounded-full bg-opacity-20',
              mobile_view ? 'h-5' : 'h-3',
            )}
          >
            <SliderStepIndictor stepCount={stepCount} variant={variant} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            aria-label="Zeitstrahl Regler"
            className={cx(
              BackgroundStyle({ variant }),
              'transition:scale block aspect-square h-6 cursor-pointer rounded-full shadow focus:scale-125 md:h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-white',
            )}
          />
        </SliderPrimitive.Root>
      </div>
      {labels && !mobile_view && (
        <div className="mt-4 flex w-full justify-between">
          {labels.map((l: string | number, i: number) => (
            <Text
              as={labels.length < 10 ? 'h6' : 'xxs'}
              className={cx(
                value === i ? 'underline' : '',
                'max-w-12 text-center',
              )}
              key={i}
              tag={'span'}
              variant={variant}
            >
              {l}
            </Text>
          ))}
        </div>
      )}
    </div>
  )
}
