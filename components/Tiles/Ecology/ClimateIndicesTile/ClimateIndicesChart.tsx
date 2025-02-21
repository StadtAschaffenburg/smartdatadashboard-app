'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { getYear, parse } from 'date-fns'
import Switch from '@/components/Inputs/Switch'
import Title from '@/components/Elements/Title'
import { useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import useDevice from '@/hooks/useDevice'
import {
  MsKlimadashboardIconsKlimakenntageEis,
  MsKlimadashboardIconsKlimakenntageFrost,
  MsKlimadashboardIconsKlimakenntageHeiss,
  MsKlimadashboardIconsKlimakenntageSommer,
  MsKlimadashboardIconsKlimakenntageTropennacht,
} from '@/components/Icons/Klima'
import {
  ClimateIndex,
  ClimateIndices,
  ClimateIndicesChartProps,
  IndicesTypes,
} from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'

const { theme } = resolveConfig(tailwindConfig)

const colorLookup: Record<
  IndicesTypes,
  'blue' | 'primary' | 'economy' | 'green' | 'society'
> = {
  eistage: 'blue',
  frosttage: 'primary',
  heisse_tage: 'economy',
  sommertage: 'green',
  tropennaechte: 'society',
}

const STARTING_YEAR = 1990

const getSeries = (data: ClimateIndex[], property: keyof ClimateIndex) => {
  const arr = data
    .filter(e => new Date(e.timestamp).getFullYear() >= STARTING_YEAR)
    .map(e => [
      parse(e.timestamp, 'yyyy-MM-dd HH:mm:ssXXX', new Date()),
      e[property],
    ])
    .reduce((acc: Record<string, number>, [timestamp, value]) => {
      const year = getYear(timestamp as Date)

      // if current year, ignore
      if (year === new Date().getFullYear()) {
        return acc
      }

      acc[year] = (acc[year] ?? 0) + (value as number)

      return acc
    }, {})

  return Object.entries(arr).map(([year, value]) => [
    `${year}-01-01T00:00:00.000Z`,
    value,
  ])
}

/**
 * All the indices that are on the chart
 */
function getIndices(data: ClimateIndex[]) {
  const indices: ClimateIndices = {
    heisse_tage: {
      title: 'Heiße Tage (>= 30°C)',
      icon: MsKlimadashboardIconsKlimakenntageHeiss,
      seriesOption: {
        name: 'Heiße Tage',
        data: getSeries(data, 'heisse_tage'),
        // @ts-ignore
        color: theme?.colors?.economy?.DEFAULT || '#6060d6',
      },
    },
    sommertage: {
      title: 'Sommertage (>= 25°C)',
      icon: MsKlimadashboardIconsKlimakenntageSommer,
      seriesOption: {
        name: 'Sommertage',
        data: getSeries(data, 'sommertage'),
        // @ts-ignore
        color: theme?.colors?.green?.DEFAULT || '#6060d6',
      },
    },
    tropennaechte: {
      title: 'Tropennächte (>= 20°C)',
      icon: MsKlimadashboardIconsKlimakenntageTropennacht,
      seriesOption: {
        name: 'Tropennächte',
        data: getSeries(data, 'tropennaechte'),
        // @ts-ignore
        color: theme?.colors?.society?.DEFAULT || '#6060d6',
      },
    },
    frosttage: {
      title: 'Frosttage (Min. < 0°C)',
      seriesOption: {
        name: 'Frosttage',
        data: getSeries(data, 'frosttage'),
        // @ts-ignore
        color: theme?.colors?.primary?.DEFAULT || '#6060d6',
      },
      icon: MsKlimadashboardIconsKlimakenntageFrost,
    },
    eistage: {
      title: 'Eistage (Max. < 0°C)',
      icon: MsKlimadashboardIconsKlimakenntageEis,
      seriesOption: {
        name: 'Eistage',
        data: getSeries(data, 'eistage'),
        // @ts-ignore
        color: theme?.colors?.primary?.medium || '#6060d6',
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
  indices: ClimateIndices
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

/**
 *
 * @returns The Climate Indices Chart
 */
export default function ClimateIndicesChart({
  data,
}: ClimateIndicesChartProps) {
  const device = useDevice()
  const indices = getIndices(data)

  const [seriesVisible, setSeriesVisible] = useState<
    Record<IndicesTypes, boolean>
  >({
    eistage: false,
    frosttage: false,
    heisse_tage: true,
    sommertage: false,
    tropennaechte: false,
  })

  if (!data || !data.length) {
    return (
      <div className="align-center flex h-full w-full justify-center">
        <RequestIndicator />
      </div>
    )
  }

  const series: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as IndicesTypes])
    .map(e => ({
      ...indices[e as IndicesTypes].seriesOption,
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
      data: indices[e as IndicesTypes].seriesOption.data?.filter(
        // @ts-ignore
        ([date, _val]) => getYear(new Date(date)) !== new Date().getFullYear(),
      ),
    }))

  const curYearSeries: LineSeriesOption[] = Object.keys(indices)
    .filter(e => seriesVisible[e as IndicesTypes])
    .map(e => ({
      ...indices[e as IndicesTypes].seriesOption,
      name: `${
        indices[e as IndicesTypes].seriesOption.name
      } (${new Date().getFullYear()})`,
      type: 'line',
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        ...indices[e as IndicesTypes].seriesOption.lineStyle,
        type: 'dashed',
      },
      data: indices[e as IndicesTypes].seriesOption.data?.filter(
        // @ts-ignore
        ([date, _val]) =>
          getYear(new Date(date)) >= new Date().getFullYear() - 1,
      ),
    }))

  return (
    <div className="flex h-full w-full flex-col items-center p-5 2xl:flex-row">
      <div className="h-full w-full flex-1">
        <Title as="h7" font="semibold" variant={'primary'}>
          Anzahl <br />
          der Tage
        </Title>
        <div className="h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                bottom: 40,
                left: 40,
                right: 40,
              },
              tooltip: {
                trigger: 'item', // Aktiviert Tooltip bei Hover über Datenpunkt
                formatter: (params: any) => {
                  const year = new Date(params.value[0]).getFullYear()
                  const value = params.value[1]
                  const unit = 'Tage'
                  const variant = 'text-primary'

                  return `<div class="text-md border-b border-neutral-200 pb-1 mb-1 ${variant}">${params.seriesName}</div><div class="text-primary"><strong>${year}:</strong> ${value} ${unit}</div>`
                },
              },
              series: [...series, ...curYearSeries],
              xAxis: {
                type: 'time',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                },
                min: parse(
                  `${STARTING_YEAR}-01-01`,
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
                interval: 5,
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                  formatter: (val: any) => {
                    if (val === 0) {
                      return ''
                    }
                    return val
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
          defaultChecked={seriesVisible.heisse_tage}
          indices={indices}
          onChange={c => setSeriesVisible({ ...seriesVisible, heisse_tage: c })}
          type="heisse_tage"
        />
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.sommertage}
          indices={indices}
          onChange={c => setSeriesVisible({ ...seriesVisible, sommertage: c })}
          type="sommertage"
        />
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.tropennaechte}
          indices={indices}
          onChange={c =>
            setSeriesVisible({ ...seriesVisible, tropennaechte: c })
          }
          type="tropennaechte"
        />
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.frosttage}
          indices={indices}
          onChange={c => setSeriesVisible({ ...seriesVisible, frosttage: c })}
          type="frosttage"
        />
        <ClimateIndiceToggle
          defaultChecked={seriesVisible.eistage}
          indices={indices}
          onChange={c => setSeriesVisible({ ...seriesVisible, eistage: c })}
          type="eistage"
        />
      </div>
    </div>
  )
}
