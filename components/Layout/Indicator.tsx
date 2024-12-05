import {
  MinusIcon as ArrowNoData,
  ArrowDownRightIcon as IconDown,
  ArrowRightIcon as IconNeutral,
  ArrowUpRightIcon as IconUp,
} from '@heroicons/react/24/outline'

const iconClassNames = 'h-full h-full'

export function Indicator({
  current,
  previous,
}: {
  current: number
  previous: number | null
}) {
  const difference = previous != null ? Math.abs(current - previous) : null
  const percentDifference =
    difference != null && previous != null ? (difference / previous) * 100 : 0

  const Icon =
    previous == null
      ? ArrowNoData
      : previous == null || percentDifference <= 3
        ? IconNeutral
        : current > previous
          ? IconUp
          : current < previous
            ? IconDown
            : IconNeutral

  return (
    <div className="relative inline pr-8">
      <div className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2">
        <Icon className={iconClassNames} />
      </div>
    </div>
  )
}
