'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Spacer from '@/components/Elements/Spacer'
import Text from '@/components/Elements/Text'
import { useState } from 'react'
import { ContentProps } from './dt'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'
import IconFactory from '@/utils/factories/IconFactory'
import Slider from '@/components/Inputs/Slider/'
import { getRows } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function emphasize(r: number, power: number = 2): number {
  // R^power / ( R^power + (1 - R)^power )
  const rPow = Math.pow(r, power)
  const invPow = Math.pow(1 - r, power)
  return rPow / (rPow + invPow)
}

export default function CompareIconValues({
  tile_payload,
  iconBackground,
  iconLeft,
  iconRight,
  datasource,
  variant,
}: ContentProps) {
  const [yearIndex, setYearIndex] = useState(datasource.entry_count - 1)

  const years = datasource.timeline
  const { rows } = getRows(datasource, yearIndex) as {
    rows: Record<string, RowDataType>
  }

  const left_row = rows[Object.keys(rows)[0]]
  const right_row = rows[Object.keys(rows)[1]]
  const left_count = left_row?.current ?? 0
  const right_count = right_row?.current ?? 0

  let ratio =
    left_count && right_count ? left_count / (left_count + right_count) : 1

  if (ratio > 0 && ratio < 1) {
    ratio = clamp(emphasize(ratio, 0.75), 0.05, 0.95)
  }

  if (right_row === undefined || left_row === undefined) {
    return <div>Nicht genug Daten vorhanden.</div>
  }

  return (
    <div>
      <div className="mb-2 flex justify-between gap-4">
        <div className="relative">
          <Text as="h5" tag="h3" variant={left_row.variant ?? variant}>
            {left_row.label}
          </Text>
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
        <div className="flex flex-col items-end">
          <Text as="h5" tag="h3" variant={right_row.variant ?? variant}>
            {right_row.label}
          </Text>
          <AnimatedNumber
            className={'text-2xl'}
            decimals={left_row.decimals}
            previous_value={right_row.previous}
            unit={right_row.unit}
            variant={right_row.variant ?? variant}
          >
            {right_count}
          </AnimatedNumber>
        </div>
      </div>
      <div className="relative mx-auto flex aspect-[2/1] h-60 max-w-full items-stretch gap-4 overflow-hidden rounded p-4">
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
              variant={tile_payload.icon_variant || variant}
            />
          )}
          {iconBackground && (
            <div className={cx(IconStyle({ variant }), 'w-60 opacity-20')}>
              {iconBackground}
            </div>
          )}
        </div>
      </div>
      <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
      <Spacer />
    </div>
  )
}
