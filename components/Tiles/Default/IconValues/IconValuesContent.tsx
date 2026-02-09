'use client'

import { useState } from 'react'
import { ContentProps } from './dt'
import { getRows } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'
import IconFactory from '@/utils/factories/IconFactory'
import Row from './row'
import Slider from '@/components/Inputs/Slider/'
import { cx } from 'class-variance-authority'

export default function IconValuesContent({
  children,
  tile_payload,
  datasource,
  variant,
}: ContentProps) {
  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )
  const years = datasource.timeline
  const { rows, row_count } = getRows(datasource, yearIndex) as {
    rows: Record<string, RowDataType>
    row_count: number
  }

  if (row_count === 0) {
    return (
      <div className="w-full rounded border-2 border-secondary p-3 text-center font-bold text-secondary">
        Datenauswertung unvollständig.
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex max-w-full flex-row gap-6">
        {tile_payload.icon && (
          <div>
            <IconFactory
              className={cx(
                row_count === 1 ? '' : 'mt-4 max-xs:mt-2',
                'w-12 md:w-20 lg:w-32',
              )}
              type={tile_payload.icon}
              variant={tile_payload.icon_variant || variant}
            />
          </div>
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
        <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
      </div>
    </div>
  )
}
