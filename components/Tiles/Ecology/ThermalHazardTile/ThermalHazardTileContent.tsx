'use client'

import Text from '@/components/Elements/Text'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import { DataProps, RatingStrings } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'

const thermal_limit = 10

const rating_colors: { [key: number]: string } = {
  '-4': '#0600ff',
  '-3': '#006dff',
  '-2': '#00cdff',
  '-1': '#82ffff',
  0: '#7eff02',
  1: '#ffff02',
  2: '#ffc800',
  3: '#ff0000',
  4: '#dd00ff',
}

const rating_strings: { [key: number]: RatingStrings } = {
  0: ['Keine', 'Keine gesundheitliche Gefährdung'],
  1: ['Gering', 'Geringe gesundheitliche Gefährdung'],
  2: ['Mittel', 'Mittlere gesundheitliche Gefährdung'],
  3: ['Hoch', 'Hohe gesundheitliche Gefährdung'],
  4: ['Sehr Hoch', 'Sehr hohe gesundheitliche Gefährdung'],
}

function getRating(index: number): [string, string, string, string] {
  let temp_rating = ''
  if (index > 0) {
    temp_rating = 'Wärmebelastung'
  } else if (index < 0) {
    temp_rating = 'Kältestress'
  }

  const strings = rating_strings[Math.abs(index)] ?? ['Unbekannt', '']
  const color = rating_colors[index] ?? '#000000'

  return [...strings, color, temp_rating]
}

export default function ThermalHazardTileContent() {
  const { data: harzard_data, status: status_data } = useApi<DataProps[]>(
    'dwd/thermal_hazard',
    10,
  )

  const { data: perceived_temperature, status: status_temp } = useApi<
    number[] | null
  >('dwd/perceived_temperature', 60, false)

  const [day_index, setday_index] = useState<number>(0)
  const [harzard_index, setHazardIndex] = useState<number | null>(null) // heat or cold

  const timeline = Array.from({ length: 3 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
    })
  })

  useEffect(() => {
    const index = harzard_data
      ? (harzard_data[day_index] as any) *
        (perceived_temperature !== null &&
        perceived_temperature[day_index] < thermal_limit
          ? -1
          : 1)
      : 0
    setHazardIndex(index)
  }, [perceived_temperature, harzard_data, day_index])

  if (
    !harzard_data ||
    !perceived_temperature ||
    status_data !== 'success' ||
    status_temp !== 'success'
  ) {
    return (
      <RequestIndicator
        failed={status_data === 'error' || status_temp === 'error'}
      />
    )
  }

  const [rating, advice, rating_color, temperature_rating] = getRating(
    harzard_index ?? 0,
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-stretch gap-6 md:flex-row">
        <div
          className="border-climate flex w-full items-center justify-center rounded shadow md:w-48"
          style={{ backgroundColor: rating_color, borderColor: rating_color }}
        >
          <div className="flex h-20 w-full items-center justify-center rounded-md bg-gradient-to-tr from-black/40 to-black/60 bg-blend-darken md:w-48">
            <span className="text-center text-2xl font-bold text-white">
              {rating}
            </span>
          </div>
        </div>

        <Text as={'base'}>
          <div>
            {advice}
            {temperature_rating !== '' && (
              <span>
                {' '}
                aufgrund von{' '}
                <span className="whitespace-nowrap font-bold text-ecology">
                  {temperature_rating}
                </span>
              </span>
            )}
            .
          </div>
        </Text>
      </div>

      <Slider
        defaultValue={[0]}
        firstValueMobile={0}
        labels={timeline.map(e => e.toString())}
        max={timeline.length - 1}
        min={0}
        onValueChange={([e]) => {
          setday_index(e)
        }}
        variant={'ecology'}
      />
    </div>
  )
}
