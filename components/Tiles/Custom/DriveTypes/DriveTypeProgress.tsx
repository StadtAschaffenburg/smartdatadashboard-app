import { BackgroundStyle } from '@/utils/variants/BackgroundVariants'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cx } from 'class-variance-authority'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

export default function DriveTypeProgress({
  label,
  progress,
  variant,
}: {
  label?: string
  progress: number
  variant: TileVariantTypes
}) {
  const myProgress = progress > 0 ? progress : 0

  return (
    <div className="flex w-full">
      <ProgressPrimitive.Root
        aria-label={`Fortschritt ${label}: ${Math.round(myProgress)}%`}
        className="w-full"
        value={myProgress}
      >
        <ProgressPrimitive.Indicator
          className={cx(
            BackgroundStyle({ variant }),
            'relative mt-[0.8px] flex h-1.5 transition-all md:mt-[4.5px] md:h-3',
          )}
          style={{ width: `${myProgress}%` }}
        ></ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
}
