'use client'

import { useState } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Spacer from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { ContentProps } from './dt'
import { getRows } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'
import IconFactory from '@/utils/factories/IconFactory'
import Slider from '@/components/Inputs/Slider/'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function emphasize(r: number, power: number = 2): number {
  // R^power / ( R^power + (1 - R)^power )
  const rPow = Math.pow(r, power)
  const invPow = Math.pow(1 - r, power)
  return rPow / (rPow + invPow)
}

export default function CompareIconValuesContent({
  datasource,
  variant,
}: ContentProps) {
  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )
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
    ratio = clamp(emphasize(ratio, 1), 0.05, 0.95)
  }

  if (right_row === undefined || left_row === undefined) {
    return <div>Nicht genug Daten vorhanden.</div>
  }

  return (
    <div>
      <div className="mb-4 flex justify-between gap-4 max-xs:flex-col">
        <div className="relative">
          <div className="align-center flex flex-row gap-4">
            <div className="w-16">
              {left_row.icon && (
                <IconFactory
                  className={'h-full w-full object-contain'}
                  type={left_row.icon}
                  variant={left_row.variant ?? variant}
                />
              )}
            </div>
            <div>
              <Title as="h5" variant={left_row.variant ?? variant}>
                {left_row.label}
              </Title>
              <AnimatedNumber
                className={'text-2xl'}
                decimals={left_row.decimals}
                hide_indicator={left_row.hide_trend}
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
            {right_row.icon && (
              <IconFactory
                className={'h-full w-full object-contain'}
                type={right_row.icon}
                variant={right_row.variant ?? variant}
              />
            )}
          </div>
          <div>
            <Title as="h5" variant={right_row.variant ?? variant}>
              {right_row.label}
            </Title>
            <AnimatedNumber
              className={'text-2xl'}
              decimals={right_row.decimals}
              hide_indicator={right_row.hide_trend}
              previous_value={right_row.previous}
              unit={right_row.unit}
              variant={right_row.variant ?? variant}
            >
              {right_count}
            </AnimatedNumber>
          </div>
        </div>
      </div>
      <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
      <Spacer />
    </div>
  )
}
