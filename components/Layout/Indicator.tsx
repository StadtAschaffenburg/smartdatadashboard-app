import {
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
  return (
    <div className={'relative inline pr-8'}>
      <div className={'absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2'}>
        {previous === undefined || previous === null ? (
          <IconNeutral className={`${iconClassNames}`} />
        ) : current > previous ? (
          <IconUp className={`${iconClassNames}`} />
        ) : current < previous ? (
          <IconDown className={`${iconClassNames}`} />
        ) : (
          <IconNeutral className={`${iconClassNames}`} />
        )}
      </div>
    </div>
  )
}
