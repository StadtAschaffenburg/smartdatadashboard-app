import { useEffect, useState } from 'react'
import {
  parseTooltipParams,
  TooltipDataType,
  TooltipIndexType,
} from '@schleegleixner/react-statamic-api'
import {
  getSplitSeries,
  InputDataType,
  TableRowType,
} from '@schleegleixner/react-statamic-api'
import { ChartDataTypes, ChartProps } from '@/components/Tiles/Base/Chart/dt'
import { getThemeColor } from './colors'
import { SeriesOption } from 'echarts'
import { format } from 'date-fns'
import { axisFormatter } from '@schleegleixner/react-statamic-api'
import { EChartsOption } from 'echarts'

/**
 * All the indices that are on the chart
 */
export function getIndices(
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

// chartTooltipFormatter formats the tooltip for the chart
export const chartTooltipFormatter = (
  params: any,
  indices: Record<string, TooltipIndexType>,
  year_marker?: number | null,
): string => {
  const data = parseTooltipParams(params, indices)

  if (!data) {
    return ''
  }

  const yearTag = `<b className="block font-bold">${data.year} ${year_marker && year_marker < data.year ? `(Prognose)` : ''}</b><hr style="margin: .35rem 0" />`

  const seriesHtml = data.series
    .map(
      (item: TooltipDataType['series'][number], index: number) =>
        `<div data-id="${index}" class="flex flex-row gap-2 items-center my-1">${item.marker}<div class="block max-lg:max-w-[350px] whitespace-normal break-words overflow-hidden leading-tight">${item.label}: ${item.value} ${item.unit}</div></div>`,
    )
    .join('')

  return yearTag + seriesHtml
}

// useChartIndices manages the indices state for chart components
export function useChartIndices(
  datasource: ChartProps['datasource'],
  chart_type: ChartProps['chart_type'],
) {
  const [indicesState, setIndicesState] = useState<ChartDataTypes | null>(null)

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
  }, [datasource, chart_type])

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

  return { indicesState, toggleIndex }
}

export const seriesFormatter = (
  indicesState: ChartDataTypes,
  chart_type: ChartProps['chart_type'],
  stacked: boolean,
): SeriesOption[] =>
  !indicesState
    ? []
    : Object.keys(indicesState)
        .filter(key => indicesState[key]?.visible)
        .flatMap(key =>
          indicesState[key]?.seriesOption
            ? indicesState[key].seriesOption.map((opt, idx) => {
                const is_future = (opt as any).lineStyle?.type === 'dashed'
                const baseSeries = {
                  id: `${key}-${idx}`,
                  type: chart_type,
                  stack: stacked
                    ? is_future
                      ? 'future'
                      : 'current'
                    : undefined,
                  barGap: stacked ? '-1' : undefined,
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
                  connectNulls: true,
                  ...opt,
                }
                return baseSeries as SeriesOption
              })
            : [],
        )

export const xAxisFormatter = (
  categorize: boolean,
  timeline: (string | number)[],
  isBarChart: boolean,
  font_size: number,
) =>
  categorize
    ? {
        type: 'category' as const,
        data: timeline,
        boundaryGap: isBarChart,
        axisLabel: {
          fontSize: font_size,
          showMaxLabel: true,
          formatter: (value: string) => value,
        },
        splitLine: { show: !isBarChart },
        axisTick: { length: 6, alignWithLabel: true },
      }
    : {
        type: 'time' as const,
        axisLabel: {
          fontSize: font_size,
          showMaxLabel: true,
          formatter: (value: number) => format(new Date(value), 'yyyy'),
        },
        splitLine: { show: !isBarChart },
        axisTick: { length: 6 },
      }

export const yAxisFormatter = (stacked: boolean, font_size: number) => {
  return {
    type: 'value' as const,
    min: stacked ? 0 : undefined,
    axisLabel: {
      fontSize: font_size,
      formatter: (value: number) => {
        return axisFormatter(Math.round(value * 10) / 10)
      },
    },
  }
}

export const tooltipFormatter = (
  indicesState: ChartDataTypes,
  datasource: ChartProps['datasource'],
  isBarChart: boolean,
): EChartsOption['tooltip'] => {
  return {
    trigger: 'axis',
    confine: true,
    formatter: params =>
      chartTooltipFormatter(params, indicesState, datasource.year_marker),
    axisPointer: {
      type: isBarChart ? 'shadow' : 'line',
    },
  }
}
