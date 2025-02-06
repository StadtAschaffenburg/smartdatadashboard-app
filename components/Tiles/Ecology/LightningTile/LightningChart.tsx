import { ReactECharts } from '@/components/Charts/ReactECharts'
import useDevice from '@/hooks/useDevice'
import { MonthlyData } from './dt'

interface Props {
  data: MonthlyData[]
}

export default function LightningChart({ data }: Props) {
  const device = useDevice()

  return (
    <ReactECharts
      option={{
        grid: {
          left: 40,
          top: 20,
          right: 0,
          bottom: 32,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (params: any) => {
            const { name, value } = params[0]
            const matched_data = data.find(item => item.month === name)
            const splinters = matched_data?.date.split('/')
            const year = splinters ? splinters[1] : ''
            return `${name} ${year}: ${value} Blitze`
          },
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.label),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            overflow: 'truncate',
            interval: 0,
            color: 'rgb(0, 80, 150)',
            fontSize: device === 'mobile' ? 10 : 14,
          },
        },
        yAxis: {
          type: 'value',
          show: true,
          axisLabel: {
            show: true,
            color: 'rgb(0, 80, 150)',
            fontSize: 12,
            formatter: (value: number) => {
              return value
                .toLocaleString('de-DE', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
                .replace(',', '.')
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 80, 150, 0.1)',
            },
          },
        },
        series: [
          {
            data: data.map(item => item.total),
            type: 'bar',
            color: 'rgb(0, 80, 150)',
            barWidth: '80%',
            label: {
              show: true, // Enable labels
              position: 'top', // Position labels above the bars
              color: 'rgb(0, 80, 150)', // Label text color
              fontSize: device === 'mobile' ? 12 : 16,
            },
          },
        ],
      }}
    />
  )
}
