import {
  ArrowDownRightIcon as IconDown,
  ArrowRightIcon as IconNeutral,
  MinusIcon as IconNoData,
  ArrowUpRightIcon as IconUp,
} from '@heroicons/react/24/outline'

const iconClassNames = 'h-full h-full'

export function Indicator({
  current,
  previous,
}: {
  current: number | null
  previous: number | null
}) {
  const difference =
    current !== null && previous != null ? Math.abs(current - previous) : null
  const percentDifference =
    difference != null && previous != null ? (difference / previous) * 100 : 0

  const Icon =
    current == null || previous == null
      ? IconNoData
      : previous == null || percentDifference <= 3
        ? IconNeutral
        : current > previous
          ? IconUp
          : current < previous
            ? IconDown
            : IconNeutral

  return (
    <div className="relative ml-2 inline">
      <div className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2">
        {((current !== null && previous !== null) || current === null) && (
          <Icon className={iconClassNames} />
        )}
      </div>
    </div>
  )
}
