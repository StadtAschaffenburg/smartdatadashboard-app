'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { ContentProps } from './dt'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'
import { getAllSources } from '@/utils/payload'
import { getVariantType } from '@/utils/payload'
import { getRows, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function CompareIconValues({
  tile_payload,
  iconBackground,
  iconLeft,
  iconRight,
}: ContentProps) {
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
  const left_count = left_row.current ?? 0
  const right_count = right_row.current ?? 0

  const ratio = left_count > 0 ? right_count / left_count : 0
  const icon_width_left = Math.min(50 + (1 / ratio) * 25, 100)
  const icon_width_right = Math.min(50 + ratio * 25, 100)

  return (
    <div>
      <div className="mb-2 flex justify-between gap-4">
        <div className="relative">
          <Title as="h5">{left_row.label}</Title>
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={left_row.previous}
            unit={left_row.unit}
            variant={variant}
          >
            {left_count}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5">{right_row.label}</Title>
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={right_row.previous}
            unit={right_row.unit}
            variant={variant}
          >
            {right_count}
          </AnimatedNumber>
        </div>
      </div>
      <div className="relative grid h-60 w-full grid-cols-2 items-center rounded p-4">
        <div className="z-10 flex w-full justify-center">
          <div
            className={cx(
              IconStyle({ variant }),
              'flex w-full max-w-60 items-center justify-center transition-all',
            )}
            style={{
              width: `${icon_width_left}%`,
            }}
          >
            {iconLeft}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div
            className={cx(
              IconStyle({ variant }),
              'flex w-full max-w-60 items-center justify-center transition-all',
            )}
            style={{
              width: `${icon_width_right}%`,
            }}
          >
            {iconRight}
          </div>
        </div>

        {iconBackground && (
          <div className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
            <div className={cx(IconStyle({ variant }), 'w-60 opacity-20')}>
              {iconBackground}
            </div>
          </div>
        )}
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
