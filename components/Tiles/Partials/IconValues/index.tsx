'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { ContentProps, DataValue, InputDataType } from './dt'
import { getAllSources } from '@/utils/payload'
import { getDataPoint, getString, getVariantType } from '@/utils/payload'

export default function WaterContent({ children, tile_payload }: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)
  const modifier = getDataPoint(tile_payload, 'modifier', 1)
  const unit: string = getString(tile_payload, 'einheit')

  const years = data.map(e => e.ZEIT.toString())

  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [values, setValues] = useState<Record<string, DataValue>>({})

  useEffect(() => {
    const current = data[yearIndex]
    const previous = yearIndex > 0 ? data[yearIndex - 1] : null

    const newValues: Record<string, DataValue> = {}
    Object.keys(current).forEach(key => {
      if (key === 'ZEIT') {
        return
      }
      newValues[key] = {
        current:
          current && current[key] !== undefined
            ? (current[key] ?? 0) * modifier
            : 0,
        previous:
          previous && previous[key] !== undefined
            ? (previous[key] ?? 0) * modifier
            : null,
      }
    })
    setValues(newValues)
  }, [yearIndex, data])

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>{children}</span>
        <div className="flex flex-grow flex-col justify-center">
          {Object.entries(values).map(([key, value]) => (
            <Title as="h4" key={key} variant={variant}>
              <span>
                {getString(
                  tile_payload,
                  key,
                  key.charAt(0).toUpperCase() + key.slice(1),
                )}
                :
              </span>{' '}
              <AnimatedNumber decimals={0} previous_value={value.previous}>
                {value.current}
              </AnimatedNumber>{' '}
              {unit}
            </Title>
          ))}
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
          variant={variant}
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
          variant={variant}
        />
      </div>
    </div>
  )
}
