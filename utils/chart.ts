import { useEffect, useState } from 'react'
import { parseTooltipParams, TooltipDataType, TooltipIndexType } from '@schleegleixner/react-statamic-api'
import {
  getSplitSeries,
  InputDataType,
  TableRowType,
} from '@schleegleixner/react-statamic-api'
import { ChartDataTypes, ChartProps } from '@/components/Tiles/Base/Chart/dt'
import { getThemeColor } from './colors'

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
): string => {
  const data = parseTooltipParams(params, indices)

  if (!data) {
    return ''
  }

  const yearTag = `<b className="block font-bold">${data.year}</b><hr style="margin: .35rem 0" />`

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
