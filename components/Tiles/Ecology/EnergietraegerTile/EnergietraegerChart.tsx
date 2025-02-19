'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import { ChartProps } from './dt'
import { Spacer } from '@/components/Elements/Spacer'
import MobileSlider from '@/components/Inputs/MobileSlider'
import { getRows, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getSourceByName } from '@/utils/payload'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

const { theme } = resolveConfig(tailwindConfig)

export default function EnergietraegerChart({ tile_payload }: ChartProps) {
  const data: InputDataType[] = getSourceByName(
    tile_payload,
    'energiematrix.csv',
  )

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  if (!data) {
    return <RequestIndicator />
  }

  const rows = getRows(data, yearIndex, tile_payload.table_rows)
  const chartData = Object.values(rows)
    .filter(item => item.current !== null)
    .map(item => ({
      name: item.label,
      value: item.current as number,
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
                const percent = (params as any).value

                return `<p class="font-bold text-ecology">${name}<p>
                    <p>${years[yearIndex]}: ${percent.toFixed(1)}%<p>`
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
                    const percent = (params.value as number) || 0

                    if (percent < 5) {
                      return ''
                    }

                    return `{name|${params.name}}\n{value|${percent.toFixed(1)}%}`
                  },
                  rich: {
                    name: {
                      padding: [0, 0, 4, 0],
                    },
                    value: {
                      fontSize: 32,
                    },
                  },
                },
                roam: false,
                nodeClick: undefined,
                levels: [
                  {
                    itemStyle: {
                      // @ts-ignore
                      color: theme?.colors?.ecology?.DEFAULT || '#6060d6',
                    },
                  },
                ],
                data: chartData,
              },
            ],
          }}
        />
      </div>
      <Spacer size={'sm'} />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([e]) => {
          setYearIndex(e)
        }}
        variant={'ecology'}
      />
      <MobileSlider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([e]) => {
          setYearIndex(e)
        }}
        variant={'ecology'}
      />
    </div>
  )
}
