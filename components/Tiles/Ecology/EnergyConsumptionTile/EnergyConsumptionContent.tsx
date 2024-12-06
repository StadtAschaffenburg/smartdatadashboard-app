'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { convertToFloat, convertToUnixTimestamp } from '@/utils/convert'
import {
  BuildingDataType,
  buildings,
  BuildingType,
  DataType,
  EnergyConsumptionContentProps,
  InputDataType,
} from './dt'

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

function getDataByBuildings(
  stromData: DataType[],
  waermeData: DataType[],
  year: number,
): BuildingDataType {
  const result: BuildingDataType = {} as BuildingDataType

  for (const mode of ['strom', 'waerme'] as const) {
    const data: DataType[] = mode === 'strom' ? stromData : waermeData

    const currentYearData = data.filter(
      d => year === new Date(d.datum).getFullYear(),
    )
    const previousYearData = data.filter(
      d => year - 1 === new Date(d.datum).getFullYear(),
    )

    for (const building of Object.keys(buildings) as (keyof BuildingType)[]) {
      if (!result[building]) {
        result[building] = {
          strom: {
            current: [],
            previous: [],
            currentSum: 0,
            previousSum: null,
          },
          waerme: {
            current: [],
            previous: [],
            currentSum: 0,
            previousSum: null,
          },
        }
      }

      const currentValues = currentYearData
        .map(d => d[building])
        .filter(d => d !== null && d !== undefined) as number[]

      const previousValues = previousYearData
        .map(d => d[building])
        .filter(d => d !== null && d !== undefined) as number[]

      const currentSum = currentValues.reduce((sum, value) => sum + value, 0)
      const previousSum =
        previousValues.length > 0
          ? previousValues.reduce((sum, value) => sum + value, 0)
          : null

      result[building][mode] = {
        current: currentValues,
        previous: previousValues.length > 0 ? previousValues : null,
        currentSum,
        previousSum,
      }
    }
  }

  return result
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

  const data = getDataByBuildings(stromData, waermeData, years[yearIndex])

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
            data={data}
            mode={mode}
            yearIndex={yearIndex}
            years={years}
          />
        </div>
        <div className="block xl:hidden">
          {' '}
          <MobileView
            data={data}
            mode={mode}
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
