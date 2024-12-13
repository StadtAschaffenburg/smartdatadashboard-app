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
import IconFactory from '@/utils/IconFactory'

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

  const ratio =
    left_count && right_count ? left_count / (left_count + right_count) : 1

  const icon_width_left = Math.min(50 + (1 / ratio) * 25, 100)
  const icon_width_right = Math.min(50 + ratio * 25, 100)

  console.log('ratio', ratio)

  return (
    <div>
      <div className="mb-2 flex justify-between gap-4">
        <div className="relative">
          <Title as="h5" variant={left_row.variant ?? variant}>
            {left_row.label}
          </Title>
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={left_row.previous}
            unit={left_row.unit}
            variant={left_row.variant ?? variant}
          >
            {left_count}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5" variant={right_row.variant ?? variant}>
            {right_row.label}
          </Title>
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={right_row.previous}
            unit={right_row.unit}
            variant={right_row.variant ?? variant}
          >
            {right_count}
          </AnimatedNumber>
        </div>
      </div>
      <div className="relative mx-auto flex aspect-[2/1] h-60 items-stretch gap-4 overflow-hidden rounded p-4">
        <div
          className="z-10 flex justify-center transition-all"
          style={{
            width: `${ratio * 100}%`,
          }}
        >
          <div
            className={cx(
              IconStyle({ variant }),
              'flex h-full w-full items-center justify-center object-contain transition-transform',
            )}
            style={{
              scale: `${80 + ratio * 20}%`,
            }}
          >
            {left_row.icon && (
              <IconFactory
                className={'h-full w-full object-contain'}
                type={left_row.icon}
                variant={left_row.variant ?? variant}
              />
            )}
            {iconLeft}
          </div>
        </div>
        <div
          className="flex justify-center transition-all"
          style={{
            width: `${100 - ratio * 100}%`,
          }}
        >
          <div
            className={cx(
              IconStyle({ variant }),
              'flex h-full w-full items-center justify-center object-contain transition-transform',
            )}
            style={{
              scale: `${80 + (1 - ratio) * 20}%`,
            }}
          >
            {right_row.icon && (
              <IconFactory
                className={'h-full w-full object-contain'}
                type={right_row.icon}
                variant={right_row.variant ?? variant}
              />
            )}
            {iconRight}
          </div>
        </div>

        <div className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
          {tile_payload.icon && (
            <IconFactory
              className={'w-60 opacity-20'}
              type={tile_payload.icon}
              variant={variant}
            />
          )}
          {iconBackground && (
            <div className={cx(IconStyle({ variant }), 'w-60 opacity-20')}>
              {iconBackground}
            </div>
          )}
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
