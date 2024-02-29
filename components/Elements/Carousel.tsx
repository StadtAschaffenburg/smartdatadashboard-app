'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useEffect, useRef, useState } from 'react'
import '@splidejs/react-splide/css'

interface CarouselProps extends SplideProps, VariantProps<typeof arrowStyle> {
  children: React.ReactElement[]
  arrows?: boolean
  pagination?: boolean
}

const arrowStyle = cva('h-6', {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      inverse: 'text-white',
      dark: 'text-zinc-900',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export default function Carousel({
  children,
  arrows = false,
  pagination = false,
  variant,
  ...props
}: CarouselProps) {
  const splideRef = useRef<Splide>(null)

  const [curIndex, setCurIndex] = useState(0)

  useEffect(() => {
    splideRef.current &&
      splideRef.current.splide?.on('move', e => setCurIndex(e))
  })

  return (
    <div className="relative">
      <Splide
        ref={splideRef}
        {...props}
        options={{
          ...props.options,
          arrows: false,
          pagination: false,
        }}
      >
        {children?.map(child => (
          <SplideSlide key={child.key}>{child}</SplideSlide>
        ))}
      </Splide>
      {(arrows || pagination) && (
        <div className="flex w-full items-center justify-between">
          {arrows && (
            <ChevronLeftIcon
              className={arrowStyle({ variant })}
              onClick={() => splideRef.current?.splide?.go('<')}
            />
          )}
          {pagination && (
            <div className="flex gap-1">
              {[...Array(children.length)].map((_, i) => (
                <div
                  className={cx(
                    'h-3 w-3 rounded-full border-2 border-buildings transition-colors',
                    curIndex === i ? 'bg-buildings' : 'bg-transparent',
                  )}
                  key={i}
                  onClick={() => splideRef.current?.splide?.go(i)}
                />
              ))}
            </div>
          )}
          {arrows && (
            <ChevronRightIcon
              className={arrowStyle({ variant })}
              onClick={() => splideRef.current?.splide?.go('>')}
            />
          )}
        </div>
      )}
    </div>
  )
}
