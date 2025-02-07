'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { parse } from 'date-fns'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import useDevice from '@/hooks/useDevice'
import { InputDataType } from '@/utils/sources'
import { ChartProps, InstitutionIndices } from './dt'
import { getAllSources, getString } from '@/utils/payload'
import Toggle from './Toggle'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import Spinner from '@/components/Elements/Spinner'
import { TableRow } from '@/types/tiles'

const { theme } = resolveConfig(tailwindConfig)

const getColor = (variant: string) => {
  // @ts-ignore
  return theme?.colors?.[variant]?.DEFAULT || '#ff0000'
}

const getSeries = (data: InputDataType[], property: keyof InputDataType) => {
  if (!data.length) {
    return []
  }

  const aggregatedData: Record<string, number | null> = data.reduce(
    (acc, item) => {
      const year = item.INDEX?.toString()
      const raw = item[property]?.toString()
      const value = raw && !isNaN(parseInt(raw, 10)) ? parseInt(raw, 10) : null

      // only allow years between 1800 and 2100
      if (
        !year ||
        isNaN(+year) ||
        year.length !== 4 ||
        +year < 1800 ||
        +year > 2100
      ) {
        return acc
      }

      if (value && !isNaN(value)) {
        acc[year] = (acc[year] || 0) + value
      } else {
        acc[year] = null
      }

      return acc
    },
    {} as Record<string, number | null>,
  )

  return Object.entries(aggregatedData).map(([year, value]) => [
    new Date(`${year}-01-01T00:00:00.000Z`).getTime(),
    value,
  ])
}

/**
 * All the indices that are on the chart
 */
function getIndices(table_rows: TableRow[], data: InputDataType[]) {
  const filtered_indices: InstitutionIndices = {}

  table_rows.forEach(row => {
    filtered_indices[row.key] = {
      title: row.label ?? row.key,
      unit: row.unit ?? null,
      variant: row.variant ?? 'primary',
      icon: row.icon ?? undefined,
      seriesOption: {
        name: row.label ?? row.key,
        data: getSeries(data, row.key),
        color: getColor(row.variant ?? 'primary'),
      },
    }
  })

  return filtered_indices
}

const getStartAndEndYear = (
  data: InputDataType[],
): { startYear: string | null; endYear: string | null } => {
  const years = data
    .map(item => parseInt(item.INDEX?.toString(), 10)) // Konvertiere Jahr in Zahl
    .filter(year => !isNaN(year) && year >= 1800 && year <= 2100) // Filtere nur gültige Jahre

  if (years.length === 0) {
    return { startYear: null, endYear: null } // Fallback, falls keine gültigen Jahre vorhanden sind
  }

  return {
    startYear: Math.min(...years).toString(),
    endYear: Math.max(...years).toString(),
  }
}

export default function LineChart({ tile_payload }: ChartProps) {
  const device = useDevice()
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const keys = tile_payload.table_rows?.map(entry => entry.key) ?? []

  const initialVisibility = keys.reduce(
    (acc, key) => {
      const row =
        tile_payload.table_rows?.find(entry => entry.key === key) ?? null
      if (row) {
        acc[key] = !!row.visible
      }
      return acc
    },
    {} as Record<string, boolean>,
  )

  const [seriesVisible, setSeriesVisible] =
    useState<Record<string, boolean>>(initialVisibility)

  if (!data || !data.length || !tile_payload.table_rows) {
    return <Spinner />
  }

  // get the indices that are on the chart
  const indices = getIndices(tile_payload.table_rows, data)

  // fetch the start year and the max visitors
  const year_limits = getStartAndEndYear(data)

  if (!year_limits.startYear || !year_limits.endYear) {
    return <></>
  }

  const series: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as string])
    .map(e => ({
      id: e,
      ...indices[e as string].seriesOption,
      type: 'line',
      itemStyle: {
        opacity: 1,
        borderColor: '#fff',
        borderWidth: 2,
      },
      symbol: 'circle',
      showAllSymbol: true,
      symbolSize: 7,
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderColor: '#005096',
          borderWidth: 3,
          width: 50,
        },
      },
    }))

  const axisy_label = getString(tile_payload, 'chart_title')

  return (
    <div className="flex w-full flex-col items-center rounded bg-white p-5 2xl:flex-row">
      <div className="h-full w-full flex-1">
        <Title as="h7" font="semibold" variant={'primary'}>
          {axisy_label}
        </Title>
        <div className="h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                bottom: 40,
                left: 50,
                right: 40,
              },
              tooltip: {
                trigger: 'item', // Aktiviert Tooltip bei Hover über Datenpunkt
                formatter: (params: any) => {
                  const year = new Date(params.value[0]).getFullYear()
                  const value = params.value[1]?.toLocaleString('de-DE')

                  const matchingIndex = indices[params.seriesId]
                  const unit = matchingIndex?.unit
                    ? ` ${matchingIndex.unit}`
                    : axisy_label
                  const variant = matchingIndex?.variant
                    ? `text-${matchingIndex.variant}`
                    : 'text-primary'

                  return `<div class="text-md border-b border-neutral-200 pb-1 mb-1 ${variant}">${params.seriesName}</div><div class="text-primary"><strong>${year}:</strong> ${value} ${unit}</div>`
                },
              },
              series: [...series],
              xAxis: {
                type: 'time',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                },
                min: parse(
                  `${year_limits.startYear}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                max: parse(
                  `${year_limits.endYear}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
              },
              yAxis: {
                type: 'value',
                min: axisValues => {
                  const realMin = axisValues.min
                  const withBuffer = realMin * 0.8
                  const power = Math.floor(Math.log10(realMin))
                  const base = Math.pow(10, power)
                  const step = base * 1
                  const niceMin = Math.floor(withBuffer / step) * step
                  return Math.max(niceMin, 0)
                },
                axisLabel: {
                  fontSize: device === 'mobile' ? 10 : 12,
                  formatter: (val: any) => {
                    if (val === 0) {
                      return ''
                    }
                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  },
                },
              },
              animation: true,
            }}
            settings={{
              notMerge: true,
            }}
          />
        </div>
      </div>
      <div className="flex h-full flex-col justify-evenly gap-1">
        {Object.keys(indices).map(key => (
          <Toggle
            defaultChecked={seriesVisible[key]}
            icon={indices[key].icon}
            indices={indices}
            key={key}
            onChange={checked =>
              setSeriesVisible(prev => ({
                ...prev,
                [key]: checked,
              }))
            }
            type={key}
          />
        ))}
      </div>
    </div>
  )
}
