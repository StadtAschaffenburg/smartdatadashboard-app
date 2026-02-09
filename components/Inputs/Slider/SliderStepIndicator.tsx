import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'
import { cx, VariantProps } from 'class-variance-authority'

export type Props = VariantProps<typeof BackgroundStyle> & {
  stepCount: number
}

export default function SliderStepIndicator({ stepCount, variant }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-between">
      {Array.from({ length: stepCount + 1 }, (_, i) => (
        <div className="h-1/2 w-6 opacity-50 md:w-9" key={i}>
          <div
            className={cx(BackgroundStyle({ variant }), 'mx-auto h-full w-px ')}
          />
        </div>
      ))}
    </div>
  )
}
