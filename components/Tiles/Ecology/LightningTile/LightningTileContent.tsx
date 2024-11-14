'use client'

import useApi from '@/hooks/useApi'
import { Spinner } from '@/components/Elements/Spinner'
import { DataType, MonthlyData } from './dt'
import LightningChart from './LightningChart'

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

function aggregateByMonth(data: DataType): MonthlyData {
  return data.reduce((acc, { ts, value }) => {
    const [day, month, year] = ts.split('.')
    const date = `${month}/${year}`
    const month_key = `${monthNames[parseInt(month, 10) - 1]}`

    const existing = acc.find(item => item.month === month_key)
    if (existing) {
      existing.total += value
    } else {
      acc.push({ date: date, month: month_key, total: value })
    }
    return acc
  }, [] as MonthlyData)
}

export default function LightningTileContent() {
  const lightning_data = useApi('thingsboard/lightning') as DataType

  if (!lightning_data || !lightning_data.length) {
    return <Spinner />
  }

  const monthly_data = aggregateByMonth(lightning_data)

  return (
    <div className="h-72">
      <LightningChart data={monthly_data} />
    </div>
  )
}
