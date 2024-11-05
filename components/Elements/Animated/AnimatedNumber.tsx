'use client'

import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

type AnimatedNumberProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: number
  decimals?: number
}

export default function AnimatedNumber({
  children,
  decimals,
  ...props
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
    <animated.span ref={ref} {...props}>
      {springProps.val.to(val =>
        new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: decimals || 0,
        }).format(val),
      )}
    </animated.span>
  )
}
