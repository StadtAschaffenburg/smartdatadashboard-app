'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { ContentProps } from './dt'
import { getAllSources } from '@/utils/payload'
import { getVariantType } from '@/utils/payload'
import { getRows, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import IconFactory from '@/utils/IconFactory'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function emphasize(r: number, power: number = 2): number {
  // R^power / ( R^power + (1 - R)^power )
  const rPow = Math.pow(r, power)
  const invPow = Math.pow(1 - r, power)
  return rPow / (rPow + invPow)
}

export default function CompareIconValues({ tile_payload }: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  if (!data) {
    return <RequestIndicator />
  }

  const rows = getRows(data, yearIndex, tile_payload.table_rows)

  const left_row = rows[Object.keys(rows)[0]]
  const right_row = rows[Object.keys(rows)[1]]
  const left_count = left_row?.current ?? 0
  const right_count = right_row?.current ?? 0

  let ratio =
    left_count && right_count ? left_count / (left_count + right_count) : 1

  if (ratio > 0 && ratio < 1) {
    ratio = clamp(emphasize(ratio, 1.25), 0.1, 0.9)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between gap-4">
        <div className="relative">
          <div className="align-center flex flex-row gap-4">
            <div className="w-16">
              <IconFactory
                className={'h-full w-full object-contain'}
                type={left_row.icon}
                variant={left_row.variant ?? variant}
              />
            </div>
            <div>
              <Title as="h5" variant={left_row.variant ?? variant}>
                {left_row.label}
              </Title>
              <AnimatedNumber
                className={'text-2xl'}
                decimals={left_row.decimals}
                previous_value={left_row.previous}
                unit={left_row.unit}
                variant={left_row.variant ?? variant}
              >
                {left_count}
              </AnimatedNumber>
            </div>
          </div>
        </div>
        <div className="align-center flex flex-row gap-4">
          <div className="w-16">
            <IconFactory
              className={'h-full w-full object-contain'}
              type={right_row.icon}
              variant={right_row.variant ?? variant}
            />
          </div>
          <div>
            <Title as="h5" variant={right_row.variant ?? variant}>
              {right_row.label}
            </Title>
            <AnimatedNumber
              className={'text-2xl'}
              decimals={right_row.decimals}
              previous_value={right_row.previous}
              unit={right_row.unit}
              variant={right_row.variant ?? variant}
            >
              {right_count}
            </AnimatedNumber>
          </div>
        </div>
      </div>
      <MobileSlider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]: [number]) => setYearIndex(index)}
        variant={variant}
      />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]: [number]) => setYearIndex(index)}
        variant={variant}
      />
      <Spacer />
    </div>
  )
}
