'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import IconPlaceholder from '@/components/Icons/Placeholder'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { ContentProps, DataValue } from './dt'

export default function PlasticWasteContent({ data }: ContentProps) {
  const years = data.map(e => e.ZEIT.toString())

  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [value, setValue] = useState<DataValue>({
    current: 0,
    previous: null,
  })

  useEffect(() => {
    const current = data[yearIndex]
    const previous = yearIndex > 0 ? data[yearIndex - 1] : null

    setValue({
      current: current.muellmenge * 1,
      previous: previous ? previous.muellmenge * 1 : null,
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
            <span>Müllmenge:</span>{' '}
            <AnimatedNumber decimals={0} previous_value={value.previous}>
              {value.current}
            </AnimatedNumber>{' '}
            <span>t</span>
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
