import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const phenomenonStyle = cva('', {
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      primary_light: 'bg-primary-light',
      secondary: 'bg-secondary bg-opacity-20',
      overlay: 'bg-primary backdrop-blur bg-opacity-90',
    },
  },
  defaultVariants: {
    variant: 'primary_light',
  },
})

export type BackgroundProps = VariantProps<typeof phenomenonStyle> & {
  children: React.ReactNode
}

export default function Background({ variant, children }: BackgroundProps) {
  return (
    <div>
      <div className={phenomenonStyle({ variant })}>{children}</div>
    </div>
  )
}
