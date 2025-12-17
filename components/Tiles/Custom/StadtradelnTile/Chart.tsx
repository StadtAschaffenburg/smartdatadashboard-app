import { ReactECharts } from '@/components/Charts/ReactECharts'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import {
  BarSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  SeriesOption,
} from 'echarts'
import { useCallback, useEffect, useState } from 'react'
import useDevice from '@/hooks/useDevice'
import { ChartProps, InputDataType } from './dt'
import { getThemeColor } from '@/utils/colors'

const default_size = 0.75
const other_size = 0.5

const colors = {
  primary: {
    color: getThemeColor('green'),
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconGreen.svg').default.src
    }`,
  },
  other: {
    color: getThemeColor('purple'),
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconCompare.svg').default.src
    }`,
  },
}

export default function Chart({ data, max, other }: ChartProps) {
  const [series, setSeries] = useState<SeriesOption[]>()

  const device = useDevice()

  const getSeries = useCallback(
    (
      data: InputDataType,
      color: string,
      symbol: string,
      symbol_size: number = 1,
    ) => {
      if (!data) {
        return []
      }

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
        barWidth: 5,
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
        symbolSize:
          device === 'desktop'
            ? [61 * symbol_size, 61 * symbol_size]
            : [30 * symbol_size, 30 * symbol_size],
        symbolOffset:
          device === 'desktop'
            ? [0 * symbol_size, -60 * symbol_size]
            : [0 * symbol_size, -30 * symbol_size],
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

    setSeries(
      getSeries(
        data,
        colors.primary.color,
        colors.primary.symbol,
        default_size,
      ),
    )
  }, [data])

  useEffect(() => {
    if (!other) {
      setSeries(
        getSeries(
          data,
          colors.primary.color,
          colors.primary.symbol,
          default_size,
        ),
      )
      return
    }

    setSeries([
      ...getSeries(
        data,
        colors.primary.color,
        colors.primary.symbol,
        default_size,
      ),
      ...getSeries(other, colors.other.color, colors.other.symbol, other_size),
    ])
  }, [other])

  if (!data) {
    return <RequestIndicator />
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
              interval: max > 1000000 ? 250_000 : 100_000,
              max: Math.ceil(max / 100000) * 100000,
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
