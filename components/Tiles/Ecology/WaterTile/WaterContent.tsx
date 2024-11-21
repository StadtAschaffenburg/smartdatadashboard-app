'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import IconPlaceholder from '@/components/Icons/Placeholder'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { ContentProps, DataValue } from './dt'

export default function WaterContent({ data }: ContentProps) {
  const years = data.map(e => e.ZEIT.toString())

  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [tapWater, setTapWaterValue] = useState<DataValue>({
    current: 0,
    previous: null,
  })
  const [rawWater, setRawWaterValue] = useState<DataValue>({
    current: 0,
    previous: null,
  })

  useEffect(() => {
    const current = data[yearIndex]
    const previous = yearIndex > 0 ? data[yearIndex - 1] : null

    setTapWaterValue({
      current: current.trinkwasser * 1,
      previous: previous ? previous.trinkwasser * 1 : null,
    })
    setRawWaterValue({
      current: current.leitungswasser * 1,
      previous: previous ? previous.leitungswasser * 1 : null,
    })
  }, [yearIndex])

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <IconPlaceholder className="h-20 fill-ecology md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-center">
          <Title as="h4" variant={'ecology'}>
            <span>Trinkwasser:</span>{' '}
            <AnimatedNumber decimals={0} previous_value={tapWater.previous}>
              {tapWater.current}
            </AnimatedNumber>{' '}
            m³{' '}
          </Title>
          <Title as="h4" variant={'ecology'}>
            <span>Leitungswasser:</span>{' '}
            <AnimatedNumber decimals={0} previous_value={rawWater.previous}>
              {rawWater.current}
            </AnimatedNumber>{' '}
            m³{' '}
          </Title>
        </div>
      </div>
      <div className="flex-1">
        <Slider
          className={'hidden xl:block'}
          defaultValue={[years.length - 1]}
          firstValueMobile={years.length - 1}
          labels={years}
          max={years.length - 1}
          min={0}
          onValueChange={([e]) => {
            setYearIndex(e)
          }}
          variant={'ecology'}
        />
        <MobileSlider
          defaultValue={[years.length - 1]}
          firstValueMobile={years.length - 1}
          labels={years}
          max={years.length - 1}
          min={0}
          onValueChange={([e]) => {
            setYearIndex(e)
          }}
          variant={'ecology'}
        />
      </div>
    </div>
  )
}
