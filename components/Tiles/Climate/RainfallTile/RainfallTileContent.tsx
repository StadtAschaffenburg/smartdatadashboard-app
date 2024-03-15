'use client'

import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'

import { MsKlimadashboardIconsWetterNiederschlag } from '@/components/Icons/Klima'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function RainfallTileContent() {
  const lightning = true // get data from API
  const years = ['2024', '2023', '2022', '2021', '2020'].reverse()

  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  if (lightning) {
    const data = {
      amount: 100 * yearIndex + 1000,
      intensity: 1 * yearIndex + 10
    }

    return (
      <div>
        <div>
          <div className="mb-4 flex flex-row gap-6">
            <span>
              <MsKlimadashboardIconsWetterNiederschlag className="h-20 text-energy md:h-32" />
            </span>
            <div className="flex flex-grow flex-col justify-between">
              <Title as={'subtitle'}>
                {' '}
                <span className="text-climate">
                  <AnimatedNumber decimals={0}>{data.amount}</AnimatedNumber> mm
                </span>{' '}
                Niederschlag mit einer Intensität von bis zu{' '}
                <span className="text-climate">
                  <AnimatedNumber decimals={2}>{data.intensity}</AnimatedNumber> mm/h
                </span>{' '}
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
