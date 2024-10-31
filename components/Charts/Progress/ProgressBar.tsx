'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, VariantProps } from 'class-variance-authority'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'

const ProgressStyle = cva('flex h-full rounded-full duration-300 ease-in-out', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})

type ProgressBarProps = VariantProps<typeof ProgressStyle> & {
  progress: number
}

function ProgressBar({ progress, variant }: ProgressBarProps) {
  return (
    <div className="rounded-full border-2 border-primary p-[.25rem]">
      <ProgressPrimitive.Root
        className="h-5 w-full overflow-hidden rounded-full bg-primary"
        value={progress}
      >
        <ProgressPrimitive.Indicator
          className={ProgressStyle({ variant })}
          style={{ width: `${progress}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export default ProgressBar
