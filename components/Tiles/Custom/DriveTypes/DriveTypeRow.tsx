import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'
import useDevice from '@/hooks/useDevice'
import { useRef } from 'react'
import BarChart from './DriveTypeBarChart'
import DriveTypeProgress from './DriveTypeProgress'
import { RowProps } from './dt'
import IconFactory from '@/utils/factories/IconFactory'
import { getThemeColor } from '@/utils/colors'

function mapBetween(
  currentNum: number,
  min: number,
  max: number,
  minAllowed = 0,
  maxAllowed = 100,
) {
  return (
    ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
  )
}

// prettier-ignore
const iconMapping: Record<string, string> = {
  Benzin: 'car_drive_b',
  Diesel: 'car_drive_d',
  Elektro: 'car_drive_electro',
  Hybrid: 'car_drive_hybrid',
  Sonstige: 'car_drive_misc',
}

export default function AutoRow({
  name,
  count,
  min,
  max,
  bar,
  Listofprogress,
  variant,
  max_total
}: RowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const device = useDevice()
  const progress =
    device === 'desktop'
      ? mapBetween(count, min * 0.9, max * 1.1, 0)
      : device === 'tablet'
        ? mapBetween(count, min * 0.9, max * 1.1, 0)
        : mapBetween(count, min * 0.9, max * 1.1, 0)
  const color = getThemeColor(variant ?? 'primary')

  if (bar) {
    return (
      <div className="my-4 flex h-20 w-full items-end pr-4 lg:gap-12">
        <div className="w-24 flex-none md:w-32">
          <Text as="h5" className="font-bold" variant="primary">
            {name}
          </Text>
          <Text as="h3" variant={variant}>
            {count > 0 ? '+' : ''}
            <AnimatedNumber>{count}</AnimatedNumber>
          </Text>
        </div>
        <div className="border-mobility flex h-full flex-1 items-end border-b-2 md:mb-0">
          <BarChart
            color={color}
            Listofprogress={Listofprogress}
            max={max_total}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="my-4 flex w-full items-end lg:gap-8">
      <div className="w-24 flex-none md:w-32">
        <Text as="h5" variant={'primary'}>
          {name}
        </Text>
        <Text as="h3" variant={variant}>
          {bar && count > 0 ? '+' : ''}
          <AnimatedNumber>{count}</AnimatedNumber>
        </Text>
      </div>
      <div className="relative w-full flex-1 md:mb-0" ref={ref}>
        <IconFactory
          className="between-1440-and-1600:hidden hidden h-8 min-w-fit lg:block lg:h-12"
          type={iconMapping[name]}
          variant={variant}
        />
        <DriveTypeProgress label={name} progress={progress} variant={variant} />
      </div>
    </div>
  )
}
