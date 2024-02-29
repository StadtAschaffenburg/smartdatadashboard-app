'use client'

import { animated, useSpring } from '@react-spring/web'

type AnimatedNumberProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: number
  decimals?: number
}

export default function AnimatedNumber({
  children,
  decimals,
  ...props
}: AnimatedNumberProps) {
  const springProps = useSpring({ val: children, from: { val: 0 } })

  return (
    <animated.span {...props}>
      {springProps.val.to(val =>
        new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: decimals || 0,
        }).format(val),
      )}
    </animated.span>
  )
}
