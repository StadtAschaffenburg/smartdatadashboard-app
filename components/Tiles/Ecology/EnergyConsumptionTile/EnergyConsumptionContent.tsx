'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { convertToFloat, convertToUnixTimestamp } from '@/utils/convert'
import { DataType, EnergyConsumptionContentProps, InputDataType } from './dt'

function convertData(data: InputDataType[]): DataType[] {
  return data.map((d: InputDataType) => ({
    datum: convertToUnixTimestamp(d.Zeit) * 1000,
    brentanoschule: convertToFloat(d['Brentanoschule (kWh)']),
    stadtbibliothek: convertToFloat(d['Stadbibliothek (kWh)']),
    frankenstolz_arena: convertToFloat(d['F.A.N Frankenstolz Arena (kWh)']),
    rathaus: convertToFloat(d['Rathaus (kWh)']),
  }))
}

function setYears(data: DataType[]): number[] {
  return Array.from(
    new Set(
      data.map(d => new Date(d.datum).getFullYear()).filter(e => e > 2018),
    ),
  ).sort((a, b) => a - b)
}

export default function EnergyConsumptionContent({
  waermeDataInput,
  stromDataInput,
}: EnergyConsumptionContentProps) {
  const waermeData: DataType[] = waermeDataInput
    ? convertData(waermeDataInput)
    : []
  const stromData: DataType[] = stromDataInput
    ? convertData(stromDataInput)
    : []
  const years = setYears(stromData)

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
            variant={'ecology'}
          ></ToggleGroup>
        </div>
        <div className="hidden xl:block">
          <DesktopView
            mode={mode}
            stromData={stromData}
            waermeData={waermeData}
            yearIndex={yearIndex}
            years={years}
          />
        </div>
        <div className="block xl:hidden">
          <MobileView
            mode={mode}
            stromData={stromData}
            waermeData={waermeData}
            yearIndex={yearIndex}
            years={years}
          />
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
        variant={'ecology'}
      />
    </>
  )
}
