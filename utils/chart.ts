import { SeriesOption } from 'echarts'
import { getThemeColor } from '@/utils/colors'
import { calculateTrendline } from '@schleegleixner/react-statamic-api'

type Index = {
  title: string
  unit?: string
  [key: string]: any
}

// chartTooltipFormatter formats the tooltip for the chart
export const chartTooltipFormatter = (
  params: any,
  indices: Record<string, Index>,
) => {
  const seen = new Set<string>()

  params = params.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex((obj: any) => obj.seriesName === item.seriesName),
  )

  return params
    .map((param: any, index: number) => {
      const marker = param.marker
      const seriesName = param.seriesName
      const value = param.value[1]?.toLocaleString('de-DE')
      const unit =
        Object.values(indices).find(i => i.title === seriesName)?.unit ?? ''
      let year_tag = ''

      if (!value || seen.has(seriesName) || seriesName === 'Trend') {
        return null
      }
      seen.add(seriesName)

      if (seen.size === 1) {
        const year = new Date(param.value[0]).getFullYear()
        year_tag = `<b className="block font-bold">${year}</b><hr style="margin: .35rem 0" />`
      }
      return `${year_tag}<div data-id="${index}" class="flex flex-row gap-2 items-center my-1">${marker}<div class="block max-lg:max-w-[350px] whitespace-normal break-words overflow-hidden leading-tight">${seriesName}: ${value} ${unit}</div></div>`
    })
    .filter((line: string | null) => line !== null)
    .join('')
}

// getTrendlineSeries generates a trendline series based on the provided line series data
export const getTrendlineSeries = ({
  series,
}: {
  series: SeriesOption[]
}): SeriesOption => {
  const trendlineData = calculateTrendline(
    [...series].flatMap(s => s.data) as [string, number][],
  )
  const trendlineColor = getThemeColor('primary')

  const trendlineSeries: SeriesOption = {
    type: 'line',
    data: trendlineData,
    name: 'Trend',
    smooth: true,
    lineStyle: {
      type: 'dotted',
      color: trendlineColor,
      opacity: 0.3,
    },
    symbol: 'none', // hide small circles on the trendline initially
    emphasis: {
      lineStyle: {
        opacity: 1, // change color on hover
      },
    },
    markLine: {},
  }

  return trendlineSeries
}
