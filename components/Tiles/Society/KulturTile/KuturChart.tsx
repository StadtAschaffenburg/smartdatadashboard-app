'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { parse } from 'date-fns'
import Switch from '@/components/Inputs/Switch'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import useDevice from '@/hooks/useDevice'
import IconPlaceholder from '@/components/Icons/Placeholder'

import {
  IndicesChartProps,
  IndicesTypes,
  InputDataType,
  InstitutionIndices,
} from './dt'

const { theme } = resolveConfig(tailwindConfig)

const colorLookup: Record<
  IndicesTypes,
  'blue' | 'primary' | 'economy' | 'green' | 'purple'
> = {
  stadthalle: 'economy',
  stadttheater: 'primary',
}

const getSeries = (data: InputDataType[], property: keyof InputDataType) => {
  const aggregatedData: Record<string, number> = data.reduce(
    (acc, item) => {
      const year = item.ZEIT
      const value = parseInt(item[property].toString(), 10)
      acc[year] = (acc[year] || 0) + value
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
function getIndices(data: InputDataType[]) {
  const indices: InstitutionIndices = {
    stadthalle: {
      title: 'Stadthalle',
      icon: IconPlaceholder,
      seriesOption: {
        name: 'Stadthalle',
        data: getSeries(data, 'stadthalle'),
        // @ts-ignore
        color: theme?.colors?.economy?.DEFAULT || '#6060d6',
      },
    },
    stadttheater: {
      title: 'Stadttheater',
      icon: IconPlaceholder,
      seriesOption: {
        name: 'Stadttheater',
        data: getSeries(data, 'stadttheater'),
        // @ts-ignore
        color: theme?.colors?.primary?.DEFAULT || '#6060d6',
      },
    },
  }

  return indices
}

/**
 *
 * @param type: the type of the icon
 * @param onChange: on toggle change
 * @returns Toggle with Icon and text
 */
function ClimateIndiceToggle({
  indices,
  type,
  defaultChecked,
  onChange,
}: {
  indices: InstitutionIndices
  type: IndicesTypes
  defaultChecked?: boolean
  onChange?: (_checked: boolean) => void
}) {
  const Icon = indices[type].icon
  const variant = colorLookup[type]

  return (
    <div className="flex w-full flex-row-reverse items-center justify-between gap-2 lg:flex-row lg:justify-normal lg:gap-4">
      <Switch
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        variant={variant}
      />
      <div className="flex items-center gap-2 md:w-max md:gap-4">
        <Icon className="aspect-square h-5 md:h-8" />
        <Title as="h5" variant={variant}>
          {indices[type].title}
        </Title>
      </div>
    </div>
  )
}

const getStartYear = (data: InputDataType[]): string => {
  const years = data.map(item => parseInt(item.ZEIT.toString(), 10))
  return Math.min(...years).toString()
}

/**
 *
 * @returns The Climate Indices Chart
 */
export default function ClimateIndicesChart({ data }: IndicesChartProps) {
  const device = useDevice()
  const indices = getIndices(data)

  // fetch the start year and the max visitors
  const start_year = getStartYear(data)

  const [seriesVisible, setSeriesVisible] = useState<
    Record<IndicesTypes, boolean>
  >({
    stadthalle: true,
    stadttheater: true,
  })

  const series: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as IndicesTypes])
    .map(e => ({
      ...indices[e as IndicesTypes].seriesOption,
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
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.stadthalle}
          indices={indices}
          onChange={c => setSeriesVisible({ ...seriesVisible, stadthalle: c })}
          type="stadthalle"
        />
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.stadttheater}
          indices={indices}
          onChange={c =>
            setSeriesVisible({ ...seriesVisible, stadttheater: c })
          }
          type="stadttheater"
        />
      </div>
    </div>
  )
}
