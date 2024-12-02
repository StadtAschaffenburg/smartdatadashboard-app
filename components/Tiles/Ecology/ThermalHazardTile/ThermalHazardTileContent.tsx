'use client'

import Text from '@/components/Elements/Text'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import { DataProps, Rating } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'

const thermal_limit = 10

const rating_keys: { [key: number]: Rating } = {
  '-4': [
    'Sehr Hoch',
    'Sehr hohe gesundheitliche Gefährdung aufgrund von Kältestress',
    '#0600ff',
  ],
  '-3': [
    'Hoch',
    'Hohe gesundheitliche Gefährdung aufgrund von Kältestress',
    '#006dff',
  ],
  '-2': [
    'Mittel',
    'Mittlere gesundheitliche Gefährdung durch Kälte',
    '#00cdff',
  ],
  '-1': [
    'Gering',
    'Geringe gesundheitliche Gefährdung aufgrund von Kältestress',
    '#82ffff',
  ],
  0: ['Keine', 'Keine gesundheitliche Gefährdung', '#7eff02'],
  1: [
    'Gering',
    'Geringe gesundheitliche Gefährdung aufgrund von Wärmebelastung',
    '#ffff02',
  ],
  2: [
    'Mittel',
    'Mittlere gesundheitliche Gefährdung aufgrund von Wärmebelastung',
    '#ffc800',
  ],
  3: [
    'Hoch',
    'Hohe gesundheitliche Gefährdung aufgrund von Wärmebelastung',
    '#ff0000',
  ],
  4: [
    'Sehr Hoch',
    'Sehr hohe gesundheitliche Gefährdung aufgrund von Wärmebelastung',
    '#dd00ff',
  ],
}

function getRating(index: number): Rating {
  return rating_keys[index] ?? ['Unbekannt', '', '']
}

export default function ThermalHazardTileContent() {
  const harzard_data = useApi('dwd/thermal_hazard') as DataProps[]
  const perceived_temperature: number | null = useApi(
    'dwd/perceived_temperature',
    10,
  ) as any

  const timeline = Array.from({ length: 3 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
    })
  })

  const [day_index, setday_index] = useState<number>(0)
  const [harzard_index, setHazardIndex] = useState<number | null>(null) // heat or cold

  useEffect(() => {
    const index = harzard_data
      ? (harzard_data[day_index] as any) *
        (perceived_temperature !== null && perceived_temperature < thermal_limit
          ? -1
          : 1)
      : 0
    setHazardIndex(index)
  }, [perceived_temperature, harzard_data, day_index])

  if (!harzard_data || !harzard_data.length || !perceived_temperature) {
    return <RequestIndicator />
  }

  const [rating, advice, rating_color] = getRating(harzard_index ?? 0)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row content-center items-center gap-6">
        <div
          className="border-climate flex items-center justify-center rounded shadow"
          style={{ backgroundColor: rating_color, borderColor: rating_color }}
        >
          <div className="flex h-20 w-48 items-center justify-center rounded-md bg-gradient-to-tr from-black/40 to-black/60 bg-blend-darken">
            <span className="text-2xl font-bold text-white">{rating}</span>
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <Text as={'base'}>
            <div>{advice}</div>
          </Text>
        </div>
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
