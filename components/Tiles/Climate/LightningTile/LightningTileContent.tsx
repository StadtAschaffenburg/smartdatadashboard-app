'use client'

import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'

import { MsKlimadashboardIconsWetterGewitter } from '@/components/Icons/Klima'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function WeatherTileContent() {
  const lightning = true // get data from API
  const years = ['2024', '2023', '2022', '2021', '2020'].reverse()

  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  if (lightning) {
    const data = {
      count: 1000 * yearIndex,
      distance: 1 * yearIndex
    }

    return (
      <div>
        <div>
          <div className="mb-4 flex flex-row gap-6">
            <span>
              <MsKlimadashboardIconsWetterGewitter className="h-20 text-energy md:h-32" />
            </span>
            <div className="flex flex-grow flex-col justify-between">
              <Title as={'subtitle'}>
                {' '}
                <span className="text-climate">
                  <AnimatedNumber decimals={0}>{data.count}</AnimatedNumber>
                </span>{' '}
                Blitze mit einer Entfernung von bis zu{' '}
                <span className="text-climate">
                  <AnimatedNumber decimals={2}>{data.distance}</AnimatedNumber> km
                </span>{' '} vom Rathaus
              </Title>
            </div>
          </div>
        </div>
        <Slider
          defaultValue={[yearIndex]}
          firstValueMobile={years.length - 1}
          labels={years.map(e => e.toString())}
          max={years.length - 1}
          min={0}
          onValueChange={([e]) => {
            setYearIndex(e)
          }}
          variant={'climate'}
        />
      </div>
    )
  }

  return <p>Loading...</p>
}
