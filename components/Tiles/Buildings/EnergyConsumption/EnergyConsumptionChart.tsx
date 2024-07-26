import { ReactECharts } from '@/components/Charts/ReactECharts'
import useDevice from '@/hooks/useDevice'
import { BarSeriesOption } from 'echarts'

interface Props {
  data: BarSeriesOption['data']
}

export default function EnergyConsumptionChart({ data }: Props) {
  const device = useDevice()

  return (
    <ReactECharts
      option={{
        grid: {
          left: 0,
          top: 5,
          right: 0,
          bottom: 32,
        },
        xAxis: {
          type: 'category',
          data: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            overflow: 'truncate', // or 'break' to continue in a new line
            interval: 0,
            color: '#8a0f76',
            fontSize: device === 'mobile' ? 12 : 20,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data,
            type: 'bar',
            color: '#8a0f76',
            barWidth: '11px',
            itemStyle: {
              opacity: 0.77,
            },
          },
        ],
      }}
    />
  )
}
