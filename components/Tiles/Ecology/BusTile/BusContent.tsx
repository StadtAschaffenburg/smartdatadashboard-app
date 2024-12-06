'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { IconBusAbgas, IconBusElektro } from '@/components/Icons/Ecology'
import { BusContentProps } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getReducedValue, getRow, getYears } from '@/utils/sources'

export default function BusContent({ data }: BusContentProps) {
  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(data ? data.length - 1 : 0)

  if (!data) {
    return <RequestIndicator />
  }

  const values = getRow(data, yearIndex, [
    'fossil',
    'elektro',
    'hybrid',
    'alternativ',
  ])

  const fossil = values.fossil
  const modern = getReducedValue(values, ['elektro', 'hybrid', 'alternativ'])

  const ratio = modern.current
    ? fossil.current / (fossil.current + modern.current)
    : 1

  return (
    <div>
      <div className="mb-2 flex justify-between gap-4">
        <div>
          <Title as="h5">Fahrzeuge mit fossilem Antrieb</Title>
          <AnimatedNumber
            className="text-2xl"
            previous_value={fossil.previous}
            variant={'ecology'}
          >
            {fossil.current}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5">Fahrzeuge mit alternativem Antrieb</Title>
          <AnimatedNumber
            className="text-2xl"
            previous_value={modern.previous}
            variant={'ecology'}
          >
            {modern.current}
          </AnimatedNumber>
        </div>
      </div>
      <div className="flex aspect-[5/2] w-full items-end gap-4 rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${ratio * 100}%`,
          }}
        >
          <IconBusAbgas className="w-full fill-ecology" />
        </div>
        <div className="flex-1">
          <IconBusElektro className="w-full fill-green" />
        </div>
      </div>
      <MobileSlider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={'ecology'}
      />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={'ecology'}
      />
      <Spacer />
    </div>
  )
}
