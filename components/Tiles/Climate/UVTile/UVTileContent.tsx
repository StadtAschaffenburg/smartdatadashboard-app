'use client'

import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'

import { MsKlimadashboardIconsWetterSonnig } from '@/components/Icons/Klima'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function UVTileContent() {
  const lightning = true // get data from API
  const years = ['2024', '2023', '2022', '2021', '2020'].reverse()

  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  if (lightning) {
    const data = {
      intensity: 100 * yearIndex + 1000
    }

    return (
      <div>
        <div>
          <div className="mb-4 flex flex-row gap-6">
            <span>
              <MsKlimadashboardIconsWetterSonnig className="h-20 text-energy md:h-32" />
            </span>
            <div className="flex flex-grow flex-col justify-between">
              <Title as={'subtitle'}>
                {' '}
                <span className="text-climate">
                  <AnimatedNumber decimals={0}>{data.intensity}</AnimatedNumber> W/m2
                </span>{' '}
                durchschnittliche UV-Belastung
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
