'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { parse } from 'date-fns'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import useDevice from '@/hooks/useDevice'
import { InputDataType } from '@/utils/sources'
import { ChartProps, InstitutionIndices } from './dt'
import { getAllSources } from '@/utils/payload'
import Toggle from './Toggle'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import Spinner from '@/components/Elements/Spinner'
import { TableRow } from '@/types/tiles'

const { theme } = resolveConfig(tailwindConfig)

const getColor = (variant: string) => {
  // @ts-ignore
  return theme?.colors?.[variant]?.DEFAULT || '#6060d6'
}

const getSeries = (data: InputDataType[], property: keyof InputDataType) => {
  if (!data.length) {
    return []
  }

  const aggregatedData: Record<string, number> = data.reduce(
    (acc, item) => {
      const year = item.ZEIT
      const value = parseInt(item[property]?.toString() || '0', 10)

      if (!isNaN(value)) {
        acc[year] = (acc[year] || 0) + value
      }

      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(aggregatedData).map(([year, value]) => [
    `${year}-01-01T00:00:00.000Z`,
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
      variant: row.variant ?? 'primary',
      seriesOption: {
        name: row.label ?? row.key,
        data: getSeries(data, row.key),
        color: getColor(row.variant ?? 'primary'),
      },
    }
  })

  return filtered_indices
}

const getStartYear = (data: InputDataType[]): string => {
  const years = data.map(item => parseInt(item.ZEIT.toString(), 10))
  return Math.min(...years).toString()
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
  const start_year = getStartYear(data)

  const series: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as string])
    .map(e => ({
      ...indices[e as string].seriesOption,
      type: 'line',
      itemStyle: {
        opacity: 0,
      },
    }))

  return (
    <div className="flex w-full flex-col items-center rounded bg-white p-5 2xl:flex-row">
      <div className="h-full w-full flex-1">
        <Title as="h7" font="semibold" variant={'primary'}>
          Besucher
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
              series: [...series],
              xAxis: {
                type: 'time',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                },
                min: parse(
                  `${start_year}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                max: parse(
                  `${new Date().getFullYear()}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
              },
              yAxis: {
                type: 'value',
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
