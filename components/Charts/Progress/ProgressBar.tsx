'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, VariantProps } from 'class-variance-authority'

const ProgressStyle = cva('flex h-full rounded-full duration-300 ease-in-out', {
  variants: {
    variant: {
      primary: 'bg-white',
      mobility: 'bg-mobility',
      climate: 'bg-climate',
      building: 'bg-buildings',
      energy: 'bg-energy',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
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
