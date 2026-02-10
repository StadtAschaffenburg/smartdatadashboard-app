'use client'

import Slider from '@/components/Inputs/Slider'
import { useBicycleCount } from '@/hooks/useBicycleCount'
import { format, subDays } from 'date-fns'
import { useState } from 'react'
import BicycleRow from './BicycleRow'
import LoadingRow from './LoadingRow'
import { getString } from '@schleegleixner/react-statamic-api'
import { TilePayloadType } from '@schleegleixner/react-statamic-api'

export default function BicycleChartContent({ tile_payload }: { tile_payload: TilePayloadType }) {
  const lastDays = new Array(7)
    .fill(undefined)
    .map((e, i) => subDays(new Date(), i + 1))
    .reverse()

  const [date, setDate] = useState<Date>(lastDays[lastDays.length - 1])

  const { data, min, max, stationCount } = useBicycleCount(date)

  const loading = !data

  return (
    <>
      <div className="rounded bg-white px-4 py-2">
        {loading &&
          new Array(stationCount)
            .fill(undefined)
            .map((_e, i) => <LoadingRow key={i} />)}
        {data &&
          data
            .filter(e => String(getString(tile_payload, 'hide_' + e.id, '')) !== 'true')
            .map(e => (
              <BicycleRow
                count={e.count}
                id={e.id}
                key={e.id}
                max={max}
                min={min}
                name={getString(tile_payload, 'station_' + e.id, e.name)}
              />
            ))}
      </div>
      {lastDays.length > 0 && (
        <Slider
          default_value={lastDays.length - 1}
          labels={lastDays.map(d => format(d, 'dd.MM.'))}
          max={lastDays.length - 1}
          min={0}
          onValueChange={(e) => {
            setDate(lastDays[e])
          }}
          variant={'primary'}
        />
      )}
    </>
  )
}
