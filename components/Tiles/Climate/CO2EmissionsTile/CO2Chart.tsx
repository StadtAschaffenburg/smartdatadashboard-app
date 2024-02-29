import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import { SeriesOption } from 'echarts'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'
import useDevice from '@/hooks/useDevice'
import { linearRegression } from 'simple-statistics'
import { useWindowSize } from 'react-use'

type CO2ChartProps = {
  showFuture?: boolean
  mode: 'co2' | 'endenergie'
}

export default function CO2Chart({ showFuture = false, mode }: CO2ChartProps) {
  const data = useCO2Data(mode)
  const device = useDevice()
  const { width } = useWindowSize()

  /**
   * Prepares the data for the chart
   * @param key The key to prepare
   * @returns The prepared data
   */
  const prepareData = (key: keyof (typeof data)[0]) => {
    const baseData = data.map(e => [
      parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
      e[key],
    ])
    if (data[data.length - 1].Jahr >= 2030) {
      baseData.pop()
    }
    return baseData
  }

  /**
   * Prepares the data for the chart
   * @param key The key to prepare
   * @returns The prepared data
   */
  const prepareFutureData = (key: keyof (typeof data)[0]) => {
    const baseData = data.map(e => [
      parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
      e[key],
    ])
    let lastYear = baseData[baseData.length - 1]

    if (data[data.length - 1].Jahr >= 2030) {
      if (showFuture) {
        return [baseData[baseData.length - 2], baseData[baseData.length - 1]]
      }
      lastYear = baseData[baseData.length - 2]
    }

    const { m, b } = linearRegression(baseData)
    const x = parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime()

    const y = showFuture ? 0 : m * x + b

    return [
      lastYear,
      [parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(), y],
    ]
  }

  const series: SeriesOption[] = [
    {
      type: 'line',
      name: 'Verkehr',
      data: prepareData('Verkehr'),
      showSymbol: false,
      color: '#34c17b',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Industrie',
      data: prepareData('Industrie'),
      showSymbol: false,
      color: '#2ABADC',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Gewerbe und Sonstiges',
      data: prepareData('Gewerbe + Sonstiges'),
      showSymbol: false,
      color: '#F28647',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Private Haushalte',
      data: prepareData('Private Haushalte'),
      showSymbol: false,
      color: '#6060D6',
      lineStyle: {
        width: 3,
      },
    },
    // Gesamter Verbrauch/Ausstoß
    // {
    //   type: 'line',
    //   name: 'Gesamt',
    //   data: prepareData('Gesamt'),
    //   showSymbol: false,
    //   color: '#f3e500',
    //   lineStyle: {
    //     width: 3,
    //     type: 'solid',
    //   },
    // },
  ]

  const seriesFuture: SeriesOption[] = [
    {
      type: 'line',
      data: prepareFutureData('Verkehr'),
      showSymbol: false,
      color: '#34c17b',
      lineStyle: {
        width: 3,
        type: 'dashed',
      },
    },
    {
      type: 'line',
      data: prepareFutureData('Industrie'),
      showSymbol: false,
      color: '#2ABADC',
      lineStyle: {
        width: 3,
        type: 'dashed',
      },
    },
    {
      type: 'line',
      name: 'Gewerbe und Sonstiges (Future)',
      data: prepareFutureData('Gewerbe + Sonstiges'),
      showSymbol: false,
      color: '#F28647',
      lineStyle: {
        width: 3,
        type: 'dashed',
      },
    },
    {
      type: 'line',
      name: 'Private Haushalte (Future)',
      data: prepareFutureData('Private Haushalte'),
      showSymbol: false,
      color: '#6060D6',
      lineStyle: {
        width: 3,
        type: 'dashed',
      },
    },
    // Gesamter Verbrauch/Ausstoß
    // {
    //   type: 'line',
    //   name: 'Gesamt (Future)',
    //   data: prepareFutureData('Gesamt'),
    //   showSymbol: false,
    //   color: '#f3e500',
    //   lineStyle: {
    //     width: 3,
    //     type: 'dashed',
    //   },
    // },
  ]

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1">
        <ReactECharts
          option={{
            grid: {
              top: 24,
              right: 0,
              bottom: 48,
              left: ['mobile', 'tablet'].includes(device) ? 40 : 80,
            },
            xAxis: {
              type: 'time',
              max: parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(),
              axisLabel: {
                fontSize: device === 'mobile' ? 12 : 20,
              },
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                fontSize: device === 'mobile' ? 12 : 20,
                formatter: (val: any) => {
                  if (val === 0) {
                    return ''
                  }
                  return new Intl.NumberFormat('de-DE', {
                    maximumFractionDigits: 0,
                  }).format(val / (mode === 'co2' ? 1000 : 1))
                },
              },
            },
            series: [...series, ...seriesFuture],
            legend: {
              show: false,
            },
          }}
          renderer="svg"
          style={{
            height: width < 1024 ? '200px' : '100%',
          }}
        />
      </div>
      <Spacer />
      <div className="flex flex-wrap items-center gap-4 md:ml-[80px]">
        {series.map((s, i) => (
          <div className="flex min-w-[8rem] items-center gap-2" key={i}>
            <div
              className="h-1 w-8 rounded-full"
              style={{ backgroundColor: s.color as string }}
            ></div>
            <Title as="h5" className="font-normal" variant={'primary'}>
              {s.name}
            </Title>
          </div>
        ))}
      </div>
    </div>
  )
}
