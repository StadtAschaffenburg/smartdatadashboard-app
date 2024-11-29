'use client'

import useApi from '@/hooks/useApi'
import Spinner from '@/components/Elements/Spinner'
import { DataType, MonthlyData } from './dt'
import LightningChart from './LightningChart'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'

const monthCount = 5 // Anzahl der angezeigten Monate

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

    const existing = acc.find(item => item.date === date)
    if (existing) {
      existing.total += value
    } else {
      acc.push({
        date,
        month: month_key,
        label: `${month_key} ${year}`,
        total: value,
      })
    }
    return acc
  }, [] as MonthlyData)
}

export default function LightningTileContent() {
  const lightning_data = useApi('thingsboard/lightning', 60 * 24) as DataType
  const monthly_data = lightning_data ? aggregateByMonth(lightning_data) : []

  const [month_index, setMonthIndex] = useState(11)

  const visible_months = monthly_data.slice(
    Math.max(0, month_index - (monthCount - 1)),
    month_index + 1,
  )

  if (!lightning_data || !lightning_data.length) {
    return <Spinner />
  }

  return (
    <div>
      <div className="h-72">
        <LightningChart data={visible_months} />
      </div>
      <Slider
        className={'hidden xl:block'}
        defaultValue={[monthly_data.length - 1]} // Setze den Standardwert auf den neuesten Monat
        max={monthly_data.length - 1}
        min={Math.max(monthCount - 1, 0)}
        onValueChange={([index]) => setMonthIndex(index)}
        variant={'ecology'}
      />
    </div>
  )
}
