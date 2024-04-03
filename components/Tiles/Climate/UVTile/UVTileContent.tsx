'use client'

import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import useUVIndex from '@/hooks/useUVIndex'

export default function UVTileContent() {
  const uv_data = useUVIndex()
  const timeline = Array.from({ length: 3 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
    })
  })

  type Rating = [string, string, string]

  const rating: { [key: number]: Rating } = {
    0: ['Niedrig', 'Kein Schutz erforderlich', '#28965A'],
    3: ['Mittel', 'Schutz erforderlich', '#F7E55B'],
    6: ['Hoch', 'Schutz erforderlich', '#F2994A'],
    8: ['Hoch', 'Schutz absolut erforderlich', '#EB5757'],
    11: ['Extrem', 'Schutz absolut erforderlich', '#BB2D3B'],
  }

  function getRating(index: number): Rating {
    const hvkey = Object.keys(rating)
      .map(Number)
      .reverse()
      .find(hvkey => index >= hvkey)
    return hvkey !== undefined ? rating[hvkey] : ['Unbekannt', '', '']
  }

  const [dayIndex, setDayIndex] = useState<number>(timeline.length - 1)

  if (uv_data && uv_data.length > 0) {
    const uv_index: number = uv_data[dayIndex] as any // not proud of this
    const [rating, advice, rating_color] = getRating(uv_index)

    return (
      <div>
        <div>
          <div className="mb-8 flex flex-row content-center gap-6">
            <div className="flex items-center justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-climate bg-transparent"
                style={{ borderColor: rating_color }}
              >
                <span
                  className="text-[40px] font-bold"
                  style={{ color: rating_color }}
                >
                  {uv_index}
                </span>
              </div>
            </div>
            <div className="flex flex-grow flex-col justify-between">
              <Title as={'subtitle'}>
                <div>
                  Gefahr: <span className="text-climate">{rating}</span>
                </div>
                <div>{advice}</div>
              </Title>
            </div>
          </div>
        </div>
        <Slider
          defaultValue={[0]}
          firstValueMobile={timeline.length - 1}
          labels={timeline.map(e => e.toString())}
          max={timeline.length - 1}
          min={0}
          onValueChange={([e]) => {
            setDayIndex(e)
          }}
          variant={'climate'}
        />
      </div>
    )
  }

  return <p>Lade Daten...</p>
}
