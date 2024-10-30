'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'

import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

// @ts-ignore
import waermeDataTable from '@/assets/data/waerme.csv'

// @ts-ignore
import stromDataTable from '@/assets/data/strom.csv'

type InputDataType = {
  Zeit: string
  'Brentanoschule (kWh)': string
  'Stadbibliothek (kWh)': string
  'F.A.N Frankenstolz Arena (kWh)': string
  'Rathaus (kWh)': string
}

type DataType = {
  Datum: number
  brentanoschule: number | null
  stadtbibliothek: number | null
  frankenstolz_arena: number | null
  rathaus: number | null
}

const convertToFloat = (str: string): number =>
  parseFloat(str.replace(/\./g, '').replace(',', '.'))

const monthMap: { [key: string]: number } = {
  Jan: 0,
  Feb: 1,
  Mär: 2,
  Apr: 3,
  Mai: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Dez: 11,
}

const convertToUnixTimestamp = (dateStr: string): number => {
  if (/^\d{4}$/.test(dateStr)) {
    // Check if the dateStr is just a year
    const date = new Date(`${dateStr}-01-01T00:00:00Z`)
    return Math.floor(date.getTime() / 1000)
  }
  const [monthStr, yearStr] = dateStr.split(' ')
  const month = monthMap[monthStr]
  const year = parseInt(`20${yearStr}`, 10) // Assumes the year is in the 21st century
  const date = new Date(year, month, 1) // Month in Date object is 0-based
  return Math.floor(date.getTime() / 1000)
}

const stromData: DataType[] = stromDataTable.map((d: InputDataType) => ({
  Datum: convertToUnixTimestamp(d.Zeit) * 1000,
  brentanoschule: convertToFloat(d['Brentanoschule (kWh)']),
  stadtbibliothek: convertToFloat(d['Stadbibliothek (kWh)']),
  frankenstolz_arena: convertToFloat(d['F.A.N Frankenstolz Arena (kWh)']),
  rathaus: convertToFloat(d['Rathaus (kWh)']),
}))

const waermeData: DataType[] = waermeDataTable.map((d: InputDataType) => ({
  Datum: convertToUnixTimestamp(d.Zeit) * 1000,
  brentanoschule: convertToFloat(d['Brentanoschule (kWh)']),
  stadtbibliothek: convertToFloat(d['Stadbibliothek (kWh)']),
  frankenstolz_arena: convertToFloat(d['F.A.N Frankenstolz Arena (kWh)']),
  rathaus: convertToFloat(d['Rathaus (kWh)']),
}))

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
        variant={'buildings'}
      />
    </>
  )
}
