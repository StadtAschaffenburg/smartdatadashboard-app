'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'

import stromData from '@/assets/data/strom.json'
import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const years = Array.from(
  new Set(
    stromData.map(d => new Date(d.Datum).getFullYear()).filter(e => e > 2018),
  ),
).sort((a, b) => a - b)

export default function EnergyConsumptionContent() {
  const [mode, setMode] = useState<'strom' | 'waerme'>('strom')
  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  return (
    <>
      <div className="relative h-full w-full rounded bg-white p-5 pt-8">
        <div className="absolute -top-4 right-0 w-full md:-top-6 md:w-auto">
          <ToggleGroup
            items={[
              {
                element: 'Strom',
                value: 'strom',
              },
              {
                element: 'Wärme',
                value: 'waerme',
              },
            ]}
            onChange={value => setMode(value as 'strom' | 'waerme')}
            variant={'building'}
          ></ToggleGroup>
        </div>
        <div className="hidden xl:block">
          <DesktopView mode={mode} yearIndex={yearIndex} />
        </div>
        <div className="block xl:hidden">
          <MobileView mode={mode} yearIndex={yearIndex} />
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
        variant={'buildings'}
      />
    </>
  )
}
