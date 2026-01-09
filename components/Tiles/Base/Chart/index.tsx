'use client'

import { useEffect, useState } from 'react'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'
import { parse } from 'date-fns'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'
import { useContentWidth } from '@schleegleixner/react-statamic-api'
import { ChartDataTypes, ChartProps } from './dt'
import {
  axisFormatter,
  axisMinimum,
  getSplitSeries,
  InputDataType,
  TableRowType,
} from '@schleegleixner/react-statamic-api'
import { getThemeColor } from '@/utils/colors'
import { chartTooltipFormatter, getTrendlineSeries } from '@/utils/chart'
import IndiciesToggle from '@/components/Tiles/Base/IndiciesToggle'
import { cx } from 'class-variance-authority'
import Text from '@/components/Elements/Text'
import Spinner from '@/components/Elements/Spinner'

/**
 * All the indices that are on the chart
 */
function getIndices(
  table_rows: TableRowType[],
  data: InputDataType[],
  split_future: boolean = true,
) {
  const filtered_indices: ChartDataTypes = {}

  table_rows.forEach(row => {
    const { past_and_present, future } = getSplitSeries(
      data,
      row.key,
      split_future,
    )
    const color = getThemeColor(row.variant ?? 'primary')

    filtered_indices[row.key] = {
      title: row.label ?? row.key,
      unit: row.unit ?? undefined,
      variant: row.variant ?? 'primary',
      visible: row.visible ?? undefined,
      icon: row.icon ?? undefined,
      hide_trend: row.hide_trend ?? undefined,
      seriesOption: [
        {
          name: row.label ?? row.key,
          data: past_and_present,
          color,
        },
        {
          name: row.label ?? row.key + ' (Prognose)',
          data: future,
          color,
          lineStyle: {
            type: 'dashed',
          },
        },
      ],
    }
  })

  return filtered_indices
}

export default function Chart({
  chart_type,
  title,
  layout = 'default',
  stacked = false,
  switch: toggle,
  datasource,
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const [indicesState, setIndicesState] = useState<ChartDataTypes | null>(null)
  const font_size_x =
    contentWidth > 1200
      ? 18
      : contentWidth > 900
        ? 16
        : contentWidth > 600
          ? 14
          : 12
  const font_size_y = contentWidth > 600 ? 12 : 10

  useEffect(() => {
    const indicies = getIndices(
      datasource.table_rows ?? [],
      datasource.content ?? [],
      chart_type === 'line',
    )

    setIndicesState(prev => {
      // set visibility of indices
      Object.keys(indicies).forEach(key => {
        indicies[key].visible = indicies[key]?.visible ?? true
      })

      if (prev) {
        // merge with previous state
        Object.keys(prev).forEach(key => {
          if (indicies[key]) {
            indicies[key].visible = prev[key].visible
          }
        })
      }
      return indicies
    })
  }, [datasource])

  const toggleIndex = (key: string, visible: boolean) =>
    setIndicesState(prev => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        [key]: { ...prev[key], visible },
      }
    })

  if (!indicesState) {
    return (
      <div className="w-full" ref={elRef}>
        <Spinner className="m-auto my-8" />
      </div>
    )
  }

  const series: SeriesOption[] = !indicesState
    ? []
    : Object.keys(indicesState)
        .filter(key => indicesState[key]?.visible)
        .flatMap(key =>
          indicesState[key]?.seriesOption
            ? indicesState[key].seriesOption.map((opt, idx) => {
                const baseSeries = {
                  id: `${key}-${idx}`,
                  type: chart_type,
                  stack: stacked ? (opt as any).lineStyle?.type === 'dashed' ? 'future' : 'current' : undefined,
                  symbol: 'circle',
                  showAllSymbol: true,
                  symbolSize: 7,
                  areaStyle: {
                    color: getThemeColor(
                      indicesState[key].variant ?? 'primary',
                    ),
                    opacity: 0.05,
                  },
                  itemStyle: {
                    opacity: 1,
                    borderColor: '#fff',
                    borderWidth: chart_type === 'line' ? 2 : 0,
                  },
                  ...opt,
                }
                return baseSeries as SeriesOption
              })
            : [],
        )

  const active_indices = Object.values(indicesState).filter(
    index => index.visible,
  )
  const trendline_series =
    (stacked && active_indices.length) ||
    (active_indices.length === 1 && !active_indices[0].hide_trend)
      ? getTrendlineSeries({ series })
      : null

  return (
    <div
      className={cx(
        'flex w-full flex-col items-center rounded bg-white p-5',
        layout === 'full' ? '' : '',
      )}
      ref={elRef}
    >
      <div className="h-full w-full flex-1">
        <div className="flex items-center justify-between gap-8">
          <AxisLabel>{datasource.labely ?? title}</AxisLabel>
          {toggle}
        </div>
        <div className="relative h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                bottom: 40,
                left: 50,
                right: 40,
              },
              tooltip: {
                trigger: 'axis',
                confine: true,
                formatter: params =>
                  chartTooltipFormatter(params, indicesState),
              },
              series: [
                ...series,
                ...(trendline_series ? [trendline_series] : []),
              ],
              xAxis: {
                type: 'time',
                axisLabel: {
                  fontSize: font_size_x,
                },
                min: parse(
                  `${datasource.year_min}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                max: parse(
                  `${datasource.year_max}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                minInterval: 3600 * 24 * 365 * 1000,
                axisTick: {
                  length: 6,
                },
                splitLine: {
                  show: true,
                },
              },
              yAxis: {
                type: 'value',
                min: axisMinimum,
                axisLabel: {
                  fontSize: font_size_y,
                  formatter: axisFormatter,
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
      {Object.keys(indicesState).length > 1 ? (
        <IndiciesToggle indices={indicesState} onToggle={toggleIndex} />
      ) : (
        <div className="flex items-center gap-2 p-4">
          <div
            className={`h-1 w-8 rounded bg-${indicesState[Object.keys(indicesState)[0]].variant} md:w-[52px]`}
          />
          <Text
            as={'h5'}
            variant={indicesState[Object.keys(indicesState)[0]].variant}
          >
            {indicesState[Object.keys(indicesState)[0]].title}
          </Text>
        </div>
      )}
    </div>
  )
}
