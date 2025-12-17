'use client'

import { useState } from 'react'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Slider from '@/components/Inputs/Slider/'
import { ChartProps } from './dt'
import Spacer from '@/components/Elements/Spacer'
import { darkenHexColor, getRows, numberFormat } from '@schleegleixner/react-statamic-api'
import { getThemeColor } from '@/utils/colors'
import RowDataType from '@/types/RowDataType'

export default function TreeMapChartContent({
  datasource,
  variant,
}: ChartProps) {
  const [yearIndex, setYearIndex] = useState(
    datasource.entry_count ? datasource.entry_count - 1 : 0,
  )

  const years = datasource.timeline
  const { rows } = getRows(datasource, yearIndex) as {
    rows: Record<string, RowDataType>
  }

  const color_usage_count: Record<string, number> = {}

  let chartData = Object.values(rows)
    .filter(item => item.current !== null)
    .map(item => {
      const variant_key = item.variant || variant
      color_usage_count[variant_key] = (color_usage_count[variant_key] || 0) + 1
      const usage_index = color_usage_count[variant_key] - 1

      const base_color = getThemeColor(variant_key)
      const color =
        usage_index === 0
          ? base_color
          : darkenHexColor(base_color, 1 - usage_index * 0.1)

      return {
        name: item.label,
        value: item.current as number,
        unit: item.unit || '',
        itemStyle: { color },
        variant: variant_key,
      }
    })

  // get maximum value from chartData
  const maxValue = Math.max(...chartData.map(item => item.value))

  // add labels to chartData
  chartData = chartData.map(item => {
    const ratio = item.value / maxValue
    const fontSize = ratio > 0.1 ? 20 : 14

    return {
      ...item,
      label: {
        show: ratio > 0.03,
        position: 'inside',
        formatter: `{name|${item.name}}\n{value|${numberFormat(item.value, 0)} ${item.unit}}`,
        rich: {
          name: {
            fontWeight: 'bold',
            color: '#fff',
            fontSize: fontSize,
          },
          value: {
            color: '#fff',
            fontSize: fontSize,
          },
        },
      },
      emphasis: {
        focus: 'descendant',
      },
    }
  })

  return (
    <div>
      <div className="h-[250px] md:h-[500px]">
        <ReactECharts
          option={{
            tooltip: {
              formatter: params => {
                const name = (params as any).name
                const value = (params as any).value
                const number = numberFormat(value, 0)
                const unit = (params as any).data.unit
                const variant = (params as any).data.variant

                return `<p class='font-bold text-${variant}'>${name}<p>
                    <p>${years[yearIndex] ? years[yearIndex] + ': ' : ''}${number} ${unit}<p>`
              },
            },
            series: [
              {
                type: 'treemap',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                breadcrumb: {
                  show: false,
                },
                itemStyle: {
                  gapWidth: 4,
                },
                roam: false,
                nodeClick: undefined,
                data: chartData,
              },
            ],
          }}
        />
      </div>
      <Spacer size={'sm'} />
      <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
    </div>
  )
}
