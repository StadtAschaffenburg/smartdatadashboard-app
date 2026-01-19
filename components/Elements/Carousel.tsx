'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { useEffect, useRef, useState } from 'react'
import '@splidejs/react-splide/css'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'

interface CarouselProps extends SplideProps, VariantProps<typeof arrowStyle> {
  children: React.ReactElement<any>[]
  arrows?: boolean
  pagination?: boolean
}

const arrowStyle = cva('h-6', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
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
                    'h-3 w-3 rounded-full border-2 border-primary transition-colors',
                    curIndex === i ? 'bg-primary' : 'bg-transparent',
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
