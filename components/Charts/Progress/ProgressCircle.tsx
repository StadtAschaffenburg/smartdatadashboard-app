'use client'

import { cva, cx, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

const progressStyle = cva('-rotate-90 stroke-[1rem]', {
  variants: {
    variant: {
      primary: 'stroke-primary',
      secondary: 'stroke-secondary',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ProgressCircleProps = VariantProps<typeof progressStyle> & {
  progress: number
  className?: string
}

export function ProgressCircle({
  progress,
  className,
  variant,
  size,
}: ProgressCircleProps) {
  const radius = 40
  const circumference = Math.ceil(2 * Math.PI * radius)
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (progress - 100)),
  )

  const transition = {
    ease: 'easeIn',
    delay: 2000,
  }

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  }

  return (
    <svg
      className={cx(progressStyle({ size, variant }), className)}
      viewBox="0 0 100 100"
    >
      <motion.circle
        cx="50"
        cy="50"
        fill="transparent"
        initial="hidden"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={fillPercents}
        style={{
          strokeLinecap: 'round',
        }}
        variants={variants as any}
      />
    </svg>
  )
}
