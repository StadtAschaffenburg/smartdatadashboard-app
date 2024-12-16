'use client'

import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { TextStyle } from '@/utils/variants/TextVariants'
import { cx, VariantProps } from 'class-variance-authority'
import { Indicator } from '@/components/Layout/Indicator'
import { sanitizeValue } from '@/utils/sanitize'
import { countDecimals } from '@/utils/sources'

type AnimatedNumberProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof TextStyle> & {
    children: number | null
    decimals?: number | null
    previous_value?: number | null
    unit?: string | null
  }

export default function AnimatedNumber({
  children,
  decimals,
  variant = 'inherit',
  className,
  previous_value,
  unit,
}: AnimatedNumberProps) {
  const [inView, setInView] = useState(false) // control whether the number is in view
  const [lastValue, setLastValue] = useState<number | null>(null)
  const ref = useRef<HTMLSpanElement>(null) // ref to the span element
  const value: number | null =
    children === null ? null : sanitizeValue(children)

  const springProps = useSpring({
    val: inView ? value : 0, // animate only if in view, make sure to convert children to number
    from: { val: 0 },
    config: { tension: 170, friction: 26 },
    onChange: ({ value }) => {
      setLastValue(value.val) // update the last value
    },
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

  decimals = decimals ?? countDecimals(value ?? 0)

  return (
    <span
      className={cx(TextStyle({ variant }), className, 'whitespace-nowrap')}
    >
      {previous_value !== undefined && (
        <Indicator current={value} previous={previous_value} />
      )}
      <span className={value === null ? 'hidden' : ''}>
        <animated.span ref={ref}>
          {lastValue === value
            ? new Intl.NumberFormat('de-DE', {
                minimumFractionDigits: decimals || 0,
                maximumFractionDigits: decimals || 0,
              }).format(value ?? 0)
            : springProps.val.to(val =>
                new Intl.NumberFormat('de-DE', {
                  minimumFractionDigits: decimals || 0,
                  maximumFractionDigits: decimals || 0,
                }).format(val),
              )}
        </animated.span>
        {unit && <span>&nbsp;{unit}</span>}
      </span>
    </span>
  )
}
