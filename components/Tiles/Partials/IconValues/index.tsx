'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import { ContentProps } from './dt'
import { getAllSources } from '@/utils/payload'
import { getDataPoint, getString, getVariantType } from '@/utils/payload'
import { getRow, getYears, InputDataType } from '@/utils/sources'
import Spinner from '@/components/Elements/Spinner'

export default function IconValues({
  children,
  keys,
  tile_payload,
}: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)
  const modifier = getDataPoint(tile_payload, 'modifier', 1)
  const unit: string = getString(tile_payload, 'einheit')

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )

  if (!data) {
    return <Spinner />
  }

  const values = getRow(
    data,
    yearIndex,
    tile_payload.table_keys ?? [],
    modifier,
  )

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
