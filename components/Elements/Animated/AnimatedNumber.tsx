'use client'

import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { TextStyle } from '@/utils/variants/TextVariants'
import { cx, VariantProps } from 'class-variance-authority'
import { Indicator } from '@/components/Layout/Indicator'

type AnimatedNumberProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof TextStyle> & {
    children: number
    decimals?: number
    previous_value?: number | null
  }

export default function AnimatedNumber({
  children,
  decimals,
  variant = 'inherit',
  className,
  previous_value,
}: AnimatedNumberProps) {
  const [inView, setInView] = useState(false) // control whether the number is in view
  const ref = useRef<HTMLSpanElement>(null) // ref to the span element

  const springProps = useSpring({
    val: inView ? children : 0, // animate only if in view
    from: { val: 0 },
    config: { tension: 170, friction: 26 },
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 1 }, // customize the threshold for when you want to start the animation
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <span className="whitespace-nowrap">
      {previous_value !== undefined && (
        <Indicator current={children} previous={previous_value} />
      )}
      <animated.span
        className={cx(TextStyle({ variant }), className)}
        ref={ref}
      >
        {springProps.val.to(val =>
          new Intl.NumberFormat('de-DE', {
            maximumFractionDigits: decimals || 0,
          }).format(val),
        )}
      </animated.span>
    </span>
  )
}
