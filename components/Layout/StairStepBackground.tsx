import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const phenomenonStyle = cva('flex-[3_3_0%]', {
  variants: {
    variant: {
      primary: 'bg-primary-light',
      secondary: 'bg-secondary bg-opacity-20',
      overlay: 'bg-primary backdrop-blur bg-opacity-90',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type StairStepBackgroundProps = VariantProps<typeof phenomenonStyle> & {
  children: React.ReactNode
}

export default function StairStepBackground({
  variant,
  children,
}: StairStepBackgroundProps) {
  return (
    <div>
      <div className="hidden h-12 w-full md:flex">
        <div className="flex-[2_2_0%]"></div>
        <div className={phenomenonStyle({ variant })}></div>
      </div>
      <div className={phenomenonStyle({ variant })}>{children}</div>
    </div>
  )
}
