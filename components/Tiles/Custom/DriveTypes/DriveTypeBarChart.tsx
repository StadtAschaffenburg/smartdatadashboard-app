import { ReactECharts } from '@/components/Charts/ReactECharts'
import useDevice from '@/hooks/useDevice'

type Props = {
  Listofprogress: number[]
  color: string
  max: number
}

export default function DriveTypeBarChart({ Listofprogress, color, max}: Props) {
  const device = useDevice()

  return (
    <ReactECharts
      option={{
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 0,
        },
        xAxis: [
          {
            type: 'category',

            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: {
          type: 'value',
          show: true,
          max: max,
          axisLabel: {
            show: false,
            inside: true,
            showMinLabel: false,
            fontSize: 12,
            backgroundColor: '#fff',
            formatter(value) {
              return Intl.NumberFormat('de-DE').format(value)
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
            },
          },
          interval: Math.ceil(max / 10000) * 10000,
        },

        series: [
          {
            data: Listofprogress,
            type: 'bar',
            itemStyle: { color: color },
            barWidth: device === 'mobile' || device === 'tablet' ? 8 : 20,
            emphasis: {
              itemStyle: {
                color: color,
              },
            },
          },
        ],
      }}
    ></ReactECharts>
  )
}