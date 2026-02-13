'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'
import {
  categorizeSeriesData,
  getTimelineFromSeries,
  getTrendlineSeries,
  useContentWidth,
} from '@schleegleixner/react-statamic-api'
import { ChartProps } from './dt'
import { getThemeColor } from '@/utils/colors'
import {
  seriesFormatter,
  tooltipFormatter,
  useChartIndices,
  xAxisFormatter,
  yAxisFormatter,
} from '@/utils/chart'
import IndiciesToggle from '@/components/Tiles/Base/IndiciesToggle'
import { cx } from 'class-variance-authority'
import Text from '@/components/Elements/Text'
import Spinner from '@/components/Elements/Spinner'

export default function Chart({
  chart_type,
  title,
  layout = 'default',
  stacked = false,
  switch: toggle,
  datasource,
  categorize = true,
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const { indicesState, toggleIndex } = useChartIndices(datasource, chart_type)

  const font_size_x =
    contentWidth > 1200
      ? 18
      : contentWidth > 900
        ? 16
        : contentWidth > 600
          ? 14
          : 12
  const font_size_y = contentWidth > 600 ? 12 : 10

  if (!indicesState) {
    return (
      <div className="w-full" ref={elRef}>
        <Spinner className="m-auto my-8" />
      </div>
    )
  }

  const series = seriesFormatter(indicesState, chart_type, stacked)

  const active_indices = Object.values(indicesState).filter(
    index => index.visible,
  )

  const isBarChart = chart_type === 'bar'
  const timeline = getTimelineFromSeries(series)

  const trendlineStyle: SeriesOption = {
    lineStyle: {
      type: 'dotted',
      color: getThemeColor('primary'),
      opacity: 0.3,
    },
  }

  const trendline_series =
    (stacked && active_indices.length) ||
    (active_indices.length === 1 && !active_indices[0].hide_trend)
      ? getTrendlineSeries(
          series,
          trendlineStyle,
          categorize ? timeline : undefined,
        )
      : null

  const series_data = categorize
    ? categorizeSeriesData(series, timeline, false)
    : series

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
                left: 60,
                right: 20,
              },
              tooltip: tooltipFormatter(indicesState, datasource, isBarChart),
              series: [
                ...series_data,
                ...(trendline_series ? [trendline_series] : []),
              ],
              xAxis: xAxisFormatter(
                categorize,
                timeline,
                isBarChart,
                font_size_x,
              ),
              yAxis: yAxisFormatter(stacked, font_size_y),
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
