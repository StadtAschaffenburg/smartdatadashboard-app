'use client'

import { animated, useSpring } from '@react-spring/web'

type AnimatedNumberProps = React.SVGAttributes<SVGTSpanElement> & {
  children: number
  decimals?: number
}

export default function AnimatedNumberSVG({
  children,
  decimals,
  ...props
}: AnimatedNumberProps) {
  const springProps = useSpring({ val: children, from: { val: 0 } })

  return (
    <animated.tspan {...props}>
      {springProps.val.to(val =>
        new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: decimals || 0,
        }).format(val),
      )}
    </animated.tspan>
  )
}
