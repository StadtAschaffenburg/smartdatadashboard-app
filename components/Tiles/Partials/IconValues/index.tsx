'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import { ContentProps } from './dt'
import { getAllSources } from '@/utils/payload'
import { getString, getVariantType } from '@/utils/payload'
import { getRow, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function IconValues({
  children,
  keys,
  tile_payload,
}: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)
  const unit: string = tile_payload.unit ?? ''

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )

  if (!data) {
    return <RequestIndicator />
  }

  const values = getRow(
    data,
    yearIndex,
    keys ?? tile_payload.table_keys ?? [],
    tile_payload.modifier ?? 1,
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
              <AnimatedNumber
                decimals={0}
                previous_value={value.previous}
                unit={unit}
              >
                {value.current}
              </AnimatedNumber>{' '}
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
