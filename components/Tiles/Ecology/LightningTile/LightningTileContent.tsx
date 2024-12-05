'use client'

import useApi from '@/hooks/useApi'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { DataType, MonthlyData } from './dt'
import LightningChart from './LightningChart'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'

const monthCount = 5

const monthNames = [
  'JAN',
  'FEB',
  'MÄR',
  'APR',
  'MAI',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OKT',
  'NOV',
  'DEZ',
]

function transformData(data: DataType[]): MonthlyData[] {
  return data.map(({ ts, value }) => {
    const [month, year] = ts.split('.')
    const month_key = `${monthNames[parseInt(month, 10) - 1]}`
    return {
      date: `${month}.${year}`,
      month: month_key,
      label: `${month_key} ${year}`,
      total: value,
    }
  })
}

export default function LightningTileContent() {
  const { data: lightning_data, status } = useApi<DataType[]>(
    'thingsboard/lightning',
    60,
    false,
  )

  const [monthly_data, setMonthlyData] = useState<MonthlyData[]>([])
  const [month_index, setMonthIndex] = useState(0)

  useEffect(() => {
    if (Array.isArray(lightning_data) && lightning_data.length > 0) {
      const transformed = transformData(lightning_data)
      setMonthlyData(transformed)
      setMonthIndex(transformed.length - 1)
    }
  }, [lightning_data])

  // gatekeeper
  if (!monthly_data || !monthly_data.length || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
  }

  const visible_months = monthly_data.slice(
    Math.max(0, month_index - (monthCount - 1)),
    month_index + 1,
  )

  return (
    <div>
      <div className="h-72">
        <LightningChart data={visible_months} />
      </div>
      <Slider
        defaultValue={[monthly_data.length - 1]}
        max={Math.max(monthly_data.length - 1, 0)}
        min={Math.max(monthCount - 1, 0)}
        onValueChange={([index]) => setMonthIndex(index)}
        variant={'ecology'}
      />
    </div>
  )
}
