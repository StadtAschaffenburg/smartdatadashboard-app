'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'

import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import {
  IconStadtwerkeAbgas,
  IconStadtwerkeElektro,
} from '@/components/Icons/Ecology'
import { ContentProps } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getReducedValue, getRows, getYears } from '@/utils/sources'

export default function StadtwerkeContent({
  data,
  tile_payload,
}: ContentProps) {
  const years = getYears(data)

  const [yearIndex, setYearIndex] = useState(data ? data.length - 1 : 0)

  if (!data) {
    return <RequestIndicator />
  }

  const values = getRows(data, yearIndex, tile_payload.table_rows)

  const fossil = values.Dieselantrieb
  const modern = getReducedValue(values, [
    'Elektroantrieb',
    'Hybridantrieb',
    'Erdgasantrieb',
  ])

  const ratio =
    fossil.current && modern.current
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
      <div className="flex aspect-[7/4] w-full items-end rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${ratio * 100}%`,
          }}
        >
          <IconStadtwerkeAbgas className="w-full fill-ecology pr-4" />
        </div>
        <div className="flex-1">
          <IconStadtwerkeElektro className="w-full fill-green" />
        </div>
      </div>
      <MobileSlider
        defaultValue={[yearIndex]}
        firstValueMobile={data.length - 1}
        labels={years}
        max={data.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={'ecology'}
      />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[yearIndex]}
        firstValueMobile={data.length - 1}
        labels={years}
        max={data.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={'ecology'}
      />
    </div>
  )
}
