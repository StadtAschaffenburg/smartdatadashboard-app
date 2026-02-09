'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { useState } from 'react'
import { ChartProps } from './dt'
import Spacer from '@/components/Elements/Spacer'
import { darkenHexColor, getDataSource, getRows, numberFormat } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getVariantType } from '@/utils/payload'
import { getThemeColor } from '@/utils/colors'
import Slider from '@/components/Inputs/Slider/'

export default function EnergietraegerChart({ tile_payload }: ChartProps) {
  const datasource = getDataSource(tile_payload)

  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )

  if (!datasource) {
    return <RequestIndicator />
  }

  const years = datasource.timeline
  const { rows } = getRows(datasource, yearIndex) as { rows: Record<string, RowDataType> }
  const variant = getVariantType(tile_payload)
  // @ts-ignore
  const baseColor = getThemeColor(variant)
  const chartData = Object.values(rows)
    .filter(item => item.current !== null)
    .map((item, index) => ({
      name: item.label,
      value: item.current as number,
      unit: item.unit || '',
      itemStyle: {
        color: darkenHexColor(baseColor, 1 - index * 0.07),
      },
    }))

  return (
    <div>
      <div className="h-[250px] md:h-[500px]">
        <ReactECharts
          option={{
            // @ts-ignore
            tooltip: {
              formatter: params => {
                const name = (params as any).name
                const value = (params as any).value
                const number = numberFormat(value, 0)
                const unit = (params as any).data.unit

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
                label: {
                  formatter: params => {
                    const value = (params.value as number) || 0
                    const number = numberFormat(value, 0)
                    const unit = (params.data as any).unit

                    return `{name|${params.name}}\n{value|${number} ${unit}}`
                  },
                  rich: {
                    name: {
                      padding: [0, 0, 4, 0],
                      fontWeight: 'bold',
                    },
                    value: {
                      // fontSize: 32,
                    },
                  },
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
      <Slider
        labels={years}
        onValueChange={setYearIndex}
        variant={variant}
      />
    </div>
  )
}
