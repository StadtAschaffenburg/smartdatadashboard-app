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
import { getString, getVariantType } from '@/utils/payload'
import { getRow, getYears, InputDataType } from '@/utils/sources'

export default function CompareIconValues({
  tile_payload,
  key_string,
  iconLeft,
  iconRight,
}: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const keys = (
    key_string ? key_string : getString(tile_payload, 'schluessel')
  ).split(';')
  const variant = getVariantType(tile_payload)

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(data.length - 1)
  const values = getRow(data, yearIndex)

  // Sicherstellen, dass Zugriff funktioniert
  const leftCount = values[keys[0]]?.current ?? 0
  const rightCount = values[keys[1]]?.current ?? 0

  const ratio = leftCount > 0 ? rightCount / leftCount : 0
  const icon_width_left = Math.min(50 + (1 / ratio) * 25, 100)
  const icon_width_right = Math.min(50 + ratio * 25, 100)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          {keys[0] !== undefined && keys[0] !== '' && (
            <Title as="h5">
              {getString(
                tile_payload,
                keys[0],
                keys[0].charAt(0).toUpperCase() + keys[0].slice(1),
              )}
            </Title>
          )}
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={values[keys[0]]?.previous}
            variant={variant}
          >
            {leftCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          {keys[1] !== undefined && keys[1] !== '' && (
            <Title as="h5">
              {getString(
                tile_payload,
                keys[1],
                keys[1].charAt(0).toUpperCase() + keys[1].slice(1),
              )}
            </Title>
          )}
          <AnimatedNumber
            className={'text-2xl'}
            previous_value={values[keys[1]]?.previous}
            variant={variant}
          >
            {rightCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="grid h-60 w-full grid-cols-2 items-center rounded p-4">
        <div className="flex w-full justify-center">
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
