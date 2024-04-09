import { ReactECharts } from '@/components/Charts/ReactECharts'
import { Spinner } from '@/components/Elements/Spinner'
import {
  BarSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  SeriesOption,
} from 'echarts'
import { useCallback, useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import useDevice from '@/hooks/useDevice'

const { theme } = resolveConfig(tailwindConfig)

const colors = {
  muenster: {
    // @ts-ignore
    color: theme?.colors?.mobility.DEFAULT || '#34c17b',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconGreen.svg').default.src
    }`,
  },
  other: {
    // @ts-ignore
    color: theme?.colors?.buildings.DEFAULT || '#6060d6',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconPurple.svg').default.src
    }`,
  },
}

type StadtradelnData = {
  name: string
  data: {
    year: number
    km: number
  }[]
}

type ChartProps = {
  compare: boolean
  data: StadtradelnData
  other?: StadtradelnData
}

export default function Chart({ data, other }: ChartProps) {
  const [series, setSeries] = useState<SeriesOption[]>()

  const device = useDevice()

  const getSeries = useCallback(
    (data: StadtradelnData, color: string, symbol: string) => {
      const lineSeries: LineSeriesOption = {
        data: data.data.map(({ year, km }) => [year, km]),
        type: 'line',
        lineStyle: {
          opacity: 0,
        },
        symbol: 'none',
        itemStyle: {},
        smooth: 0.2,
      }

      const barSeries: BarSeriesOption = {
        data: data.data.map(({ year, km }) => [year, km]),
        type: 'bar',
        barWidth: 3,
        zlevel: 10,
        itemStyle: {
          color: color,
          borderRadius: [2, 2, 0, 0],
        },
        barGap: 2,
        xAxisIndex: 1,
        label: {
          formatter: () => 'X',
          position: 'top',
        },
      }

      const barIcons: PictorialBarSeriesOption = {
        data: data.data.map(({ year, km }) => [year, km]),
        type: 'pictorialBar',
        symbol: symbol,
        symbolSize: device === 'desktop' ? [61, 61] : [30, 30],
        symbolOffset: device === 'desktop' ? [0, -60] : [0, -30],
        symbolRotate: 15,
        barWidth: 3,
        barGap: 2,
        symbolPosition: 'end',
        xAxisIndex: 1,
        zlevel: 20,
      }

      return [lineSeries, barSeries, barIcons]
    },
    [],
  )

  useEffect(() => {
    if (!data) {
      return
    }

    setSeries(getSeries(data, colors.muenster.color, colors.muenster.symbol))
  }, [data])

  useEffect(() => {
    if (!other) {
      setSeries(getSeries(data, colors.muenster.color, colors.muenster.symbol))
      return
    }

    setSeries([
      ...getSeries(data, colors.muenster.color, colors.muenster.symbol),
      ...getSeries(other, colors.other.color, colors.other.symbol),
    ])
  }, [other])

  if (!data) {
    return <Spinner />
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 h-full w-full">
        <ReactECharts
          option={{
            grid: {
              left: '20%',
              right: '10%',
              top: '20%',
              bottom: '10%',
            },
            xAxis: [
              {
                // hidden xaxis for lines
                type: 'category',
                axisTick: undefined,
                boundaryGap: false,
                position: 'bottom',
                show: false,
              },
              {
                // xaxis for bars
                type: 'category',
                axisTick: undefined,
                position: 'bottom',
                name: 'Jahr',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                },
              },
            ],
            yAxis: {
              type: 'value',
              interval: 100_000,
              max: 400_000,
              axisLabel: {
                fontSize: device === 'mobile' ? 12 : 20,
                formatter: (value: number) =>
                  value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
              },
            },
            series,
          }}
          settings={{
            notMerge: true,
          }}
        />
      </div>
    </div>
  )
}
