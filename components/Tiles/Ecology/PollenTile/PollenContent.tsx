'use client'

import PollenEntry from './PollenEntry'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import useApi from '@/hooks/useApi'
import { PollenResult } from './dt'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { TilePayloadType } from '@/types/tiles'
import { getString } from '@/utils/payload'

export default function PollenContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const { data: readings, status } = useApi<PollenResult[]>('dwd/pollen', 10)

  const [day_index, setDayIndex] = useState<number>(0)
  const [filteredData, setFilteredData] = useState<
    { name: string; value: number }[]
  >([])

  const timeline = Array.from({ length: 3 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
    })
  })

  // Update the filtered data whenever the index or readings change
  useEffect(() => {
    if (readings) {
      const updatedData = readings.map(entry => ({
        name: entry.name,
        value: entry.values[day_index] || 0, // Pick value based on index, fallback to 0
      }))
      setFilteredData(updatedData)
    }
  }, [readings, day_index])

  // gatekeeper
  if (!readings || !readings.length || status !== 'success') {
    return <RequestIndicator failed={status === 'error'} />
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredData.map(({ name, value }) => (
            <PollenEntry
              key={name}
              title={getString(tile_payload, name, name)}
              value={value}
            />
          ))}
        </div>
      </div>

      <Slider
        defaultValue={[0]}
        firstValueMobile={0}
        labels={timeline.map(e => e.toString())}
        max={timeline.length - 1}
        min={0}
        onValueChange={([e]) => {
          setDayIndex(e)
        }}
        variant={'ecology'}
      />
    </div>
  )
}
