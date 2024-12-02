'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import IconPlaceholder from '@/components/Icons/Placeholder'
import { ContentProps, DataType } from './dt'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'

export default function TileContent({
  data,
  services_analog,
  services_digital,
  variant = 'economy',
}: ContentProps) {
  const [totalCount, setTotalCount] = useState(0)
  const [digitalCount, setDigitalCount] = useState(0)
  const years: string[] = data ? data.map(e => e.ZEIT.toString()) : []
  const [yearIndex, setYearIndex] = useState(data ? data.length - 1 : 0)

  useEffect(() => {
    if (!data) {
      return
    }

    const row: DataType = data[yearIndex]

    setTotalCount(parseInt(row.total.toString(), 10))
    setDigitalCount(parseInt(row.digital.toString(), 10))
  }, [data, yearIndex])

  const icon_width = 100 - Math.min((digitalCount / totalCount) * 100, 100)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5" variant={'ecology'}>
            {services_analog}
          </Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {totalCount - digitalCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5" variant={'ecology'}>
            {services_digital}
          </Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {digitalCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="grid h-60 w-full grid-cols-2 items-center rounded p-4">
        <div className="flex w-full justify-center">
          <IconPlaceholder
            className={cx(
              IconStyle({ variant }),
              'w-full max-w-60 transition-all',
            )}
            style={{
              width: `${icon_width}%`,
            }}
          />
        </div>
        <div className="flex w-full justify-center">
          <IconPlaceholder
            className={cx(
              IconStyle({ variant: 'green' }),
              'w-full max-w-60 transition-all',
            )}
            style={{
              width: `${100 - icon_width}%`,
            }}
          />
        </div>
      </div>
      <MobileSlider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={variant}
      />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={variant}
      />
      <Spacer />
    </div>
  )
}
