'use client'

import { useState } from 'react'
import { useContentWidth } from '@schleegleixner/react-statamic-api'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import { ChartProps } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getThemeColor } from '@/utils/colors'
import { cx } from 'class-variance-authority'
import Slider from '@/components/Inputs/Slider/'
import { getRows, numberFormat, RowDataCollection } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'
import IconFactory from '@/utils/factories/IconFactory'
import { getStaticIcon } from '@/utils/convert'
import Carousel from '@/components/Elements/Carousel'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'

const breakpoint = 620

function getSeriesData(rows: RowDataCollection, width: number) {
  const data: any[] = []
  const color: string[] = []

  for (const [, row] of Object.entries(rows)) {
    const row_color = getThemeColor(row.variant ?? 'primary')
    const svg = getStaticIcon(<IconFactory type={row.icon} />, row_color)
    const base_fontsize = Math.min(24, width / 40)

    data.push({
      value: row.current ?? 0,
      name: row.label,
      label: {
        show: width >= breakpoint,
        alignTo: 'labelLine',
        formatter: () =>
          `{Icon|}\n{name|${row.label}}\n{percent|${numberFormat(row.current ?? 0, row.decimals ?? undefined)}${row.unit ?? ''}}`,
        rich: {
          Icon:
            width > 728
              ? {
                  height: Math.max(base_fontsize * 1.25, 40),
                  width: Math.max(base_fontsize * 1.25, 40),
                  align: 'left',
                  backgroundColor: {
                    image: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
                  },
                }
              : null,
          name: {
            color: row_color,
            align: 'left',
            fontSize: base_fontsize,
            padding: width <= 1280 ? [6, 0, 6, 0] : [18, 0, 6, 0],
          },
          percent: {
            color: row_color,
            align: 'left',
            fontSize: base_fontsize * 1.5,
            fontWeight: 'bold',
          },
        },
      },
    })
    color.push(row_color)
  }

  return { data, color }
}

export default function PieChartContent({
  tile_payload,
  datasource,
  variant,
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()

  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )

  const years = datasource.timeline
  const { rows } = getRows(datasource, yearIndex) as {
    rows: Record<string, RowDataType>
  }
  const indices = getSeriesData(rows, contentWidth)

  if (!indices) {
    return <RequestIndicator failed={true} />
  }

  const radius = 75

  return (
    <div
      className={cx('flex w-full flex-col items-center rounded bg-white py-4')}
      ref={elRef}
    >
      <div className="h-full w-full flex-1">
        <div className="relative h-[235px] w-full md:h-[440px]">
          {tile_payload.icon && (
            <div className="absolute h-full w-full">
              <IconFactory
                className={'h-full w-full object-contain opacity-50'}
                type={tile_payload.icon}
                variant={tile_payload.icon_variant || variant}
              />
            </div>
          )}
          <ReactECharts
            option={{
              series: [
                {
                  type: 'pie',
                  top: '10%',
                  radius: [radius + '%', radius * 0.8 + '%'],
                  labelLine: {
                    show: contentWidth >= breakpoint,
                    length: contentWidth > 1024 ? contentWidth * 0.2 : 50,
                    lineStyle: {
                      color: 'black',
                      width: 1,
                    },
                  },
                  ...indices,
                },
              ],
            }}
          />
        </div>

        {/* mobile view */}
        <div
          className={cx('py-4', contentWidth >= breakpoint ? 'hidden' : '')}
        >
          <Carousel arrows variant={variant}>
            {Object.keys(rows).map((key, index) => {
              return (
                <div
                  className="flex items-center justify-center gap-3"
                  key={index}
                >
                  <div className="w-20">
                    <IconFactory
                      type={rows[key].icon}
                      variant={rows[key].variant ?? undefined}
                    />
                  </div>
                  <div>
                    <Title as="h3" variant={rows[key].variant}>
                      {rows[key].label}
                    </Title>
                    <Text as="h3" variant={rows[key].variant}>
                      <AnimatedNumber>{rows[key].current ?? 0}</AnimatedNumber>{' '}
                      {rows[key].unit}
                    </Text>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>

      <div className="mt-4 w-full">
        <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
      </div>
    </div>
  )
}
