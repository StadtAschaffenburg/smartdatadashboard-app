import { animated, useTransition } from '@react-spring/web'

type AnimatedRollingElementProps = {
  children: React.ReactElement | React.ReactElement[]
}

export default function AnimatedRollingElement({
  children,
}: AnimatedRollingElementProps) {
  const transitions = useTransition(children, {
    from: {
      opacity: 0,
      transform: 'translate3d(0,100%,0)',
    },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-100%,0)' },
  })

  return transitions((style, item) => (
    <animated.div className="absolute" style={style}>
      {item}
    </animated.div>
  ))
}
