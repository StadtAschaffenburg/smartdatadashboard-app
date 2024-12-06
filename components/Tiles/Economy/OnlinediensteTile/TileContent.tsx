'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { IconServiceA, IconServiceD } from '@/components/Icons/Economy'
import { ContentProps, DataType } from './dt'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'

export default function TileContent({
  data,
  services_analog,
  services_digital,
  variant = 'economy',
}: ContentProps) {
  const [totalCount, setTotalCount] = useState<{
    current: number
    previous: number | null
  }>({ current: 0, previous: null })
  const [digitalCount, setDigitalCount] = useState<{
    current: number
    previous: number | null
  }>({ current: 0, previous: null })
  const [analogCount, setAnalogCount] = useState<{
    current: number
    previous: number | null
  }>({ current: 0, previous: null })
  const years: string[] = data ? data.map(e => e.ZEIT.toString()) : []
  const [yearIndex, setYearIndex] = useState(data ? data.length - 1 : 0)

  useEffect(() => {
    if (!data) {
      return
    }

    const currentRow: DataType = data[yearIndex]
    const previousRow: DataType | null =
      yearIndex > 0 ? data[yearIndex - 1] : null

    const currentTotal = parseInt(currentRow.total.toString(), 10)
    const previousTotal = previousRow
      ? parseInt(previousRow.total.toString(), 10)
      : null
    const currentDigital = parseInt(currentRow.digital.toString(), 10)
    const previousDigital = previousRow
      ? parseInt(previousRow.digital.toString(), 10)
      : null
    const currentAnalog = currentTotal - currentDigital
    const previousAnalog =
      previousTotal !== null && previousDigital !== null
        ? previousTotal - previousDigital
        : null

    setTotalCount({ current: currentTotal, previous: previousTotal })
    setDigitalCount({ current: currentDigital, previous: previousDigital })
    setAnalogCount({ current: currentAnalog, previous: previousAnalog })
  }, [data, yearIndex])

  const icon_width =
    100 - Math.min((digitalCount.current / totalCount.current) * 100, 100)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5" variant={'ecology'}>
            {services_analog}
          </Title>
          <AnimatedNumber
            className="text-2xl"
            previous_value={analogCount.previous}
            variant={variant}
          >
            {analogCount.current}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5" variant={'ecology'}>
            {services_digital}
          </Title>
          <AnimatedNumber
            className="text-2xl"
            previous_value={digitalCount.previous}
            variant={'green'}
          >
            {digitalCount.current}
          </AnimatedNumber>
        </div>
      </div>
      <div className="grid h-60 w-full grid-cols-2 items-center rounded p-4">
        <div className="flex w-full justify-center">
          <IconServiceA
            className={cx(
              IconStyle({ variant }),
              'w-full max-w-60 transition-all',
            )}
            style={{
              width: `${icon_width}%`,
            }}
          />
        </div>
        <div className="flex justify-center">
          <IconServiceD
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
