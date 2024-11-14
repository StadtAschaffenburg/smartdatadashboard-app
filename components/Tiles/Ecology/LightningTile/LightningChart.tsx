import { ReactECharts } from '@/components/Charts/ReactECharts'
import useDevice from '@/hooks/useDevice'
import { MonthlyData } from './dt'

interface Props {
  data: MonthlyData
}

export default function LightningChart({ data }: Props) {
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
          data: data.map(item => item.month),
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
            fontSize: device === 'mobile' ? 12 : 16,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: data.map(item => item.total),
            type: 'bar',
            color: 'rgb(0, 80, 150)',
            barWidth: '11px',
            itemStyle: {
              //opacity: 0.77,
            },
          },
        ],
      }}
    />
  )
}
