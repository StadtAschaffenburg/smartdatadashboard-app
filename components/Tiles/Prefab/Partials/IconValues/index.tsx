'use client'

import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import { ContentProps } from './dt'
import { getAllSources } from '@/utils/payload'
import { getVariantType } from '@/utils/payload'
import { getRows, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import IconFactory from '@/utils/IconFactory'
import Row from './row'

export default function IconValues({ children, tile_payload }: ContentProps) {
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )

  if (!data) {
    return <RequestIndicator />
  }

  const rows = getRows(data, yearIndex, tile_payload.table_rows)
  const row_count = Object.keys(rows).length

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        {tile_payload.icon && (
          <span>
            <IconFactory
              className="h-20 md:h-32"
              type={tile_payload.icon}
              variant={variant}
            />
          </span>
        )}

        {children && <span>{children}</span>}

        <div className="flex flex-grow flex-col justify-center gap-2">
          {Object.entries(rows).map(([key, row]) => (
            <Row
              data={row}
              key={key}
              single={row_count === 1}
              variant={variant}
            />
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
