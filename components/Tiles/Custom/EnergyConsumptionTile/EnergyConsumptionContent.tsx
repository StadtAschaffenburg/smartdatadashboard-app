'use client'

import { useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { BuildingDataType, DataType, EnergyConsumptionContentProps } from './dt'
import {
  convertToUnixTimestamp,
  InputDataType,
  sanitizeNumber,
  TableRowType,
} from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'

function convertData(data: InputDataType[], table_rows: TableRowType[]): any[] {
  return data.map((d: InputDataType) => {
    const converted_row: { [key: string]: any } = {
      datum: convertToUnixTimestamp(d.INDEX) * 1000,
    }

    table_rows.forEach((row, index) => {
      if (row.key && row.key in d) {
        converted_row[index] = sanitizeNumber(d[row.key])
      }
    })

    return converted_row
  })
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
  table_rows: TableRowType[],
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

    table_rows.forEach((row, index) => {
      if (!result[index]) {
        result[index] = {
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
          label: row.label ?? '',
          icon: row.icon ?? null,
        }
      }

      const currentValues = currentYearData
        .map(d => d[index])
        .filter(d => d !== null && d !== undefined) as number[]

      const previousValues = previousYearData
        .map(d => d[index])
        .filter(d => d !== null && d !== undefined) as number[]

      const currentSum = currentValues.reduce((sum, value) => sum + value, 0)
      const previousSum =
        previousValues.length > 0
          ? previousValues.reduce((sum, value) => sum + value, 0)
          : null

      result[index][mode] = {
        current: currentValues,
        previous: previousValues.length > 0 ? previousValues : null,
        currentSum,
        previousSum,
      }
    })
  }

  return result
}

export default function EnergyConsumptionContent({
  stromDataInput,
  tile_payload,
  waermeDataInput,
}: EnergyConsumptionContentProps) {
  const variant = getVariantType(tile_payload)
  const table_rows =
    tile_payload.datasources && tile_payload.datasources[0]?.table_rows
      ? tile_payload.datasources[0].table_rows
      : []
  const waermeData: DataType[] =
    waermeDataInput && table_rows
      ? convertData(waermeDataInput, table_rows)
      : []
  const stromData: DataType[] =
    stromDataInput && table_rows ? convertData(stromDataInput, table_rows) : []
  const years = setYears(stromData)

  // eslint-disable unused-imports/no-unused-vars
  const [mode, _setMode] = useState<'strom' | 'waerme'>('strom')
  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)

  if (table_rows === null) {
    return <></>
  }

  const data = getDataByBuildings(
    stromData,
    waermeData,
    years[yearIndex],
    table_rows,
  )

  return (
    <>
      <div className="relative h-full w-full rounded bg-white p-5 pt-8">
        <div className="absolute -top-4 right-0 w-full md:-top-6 md:w-auto"></div>
        <div className="hidden xl:block">
          <DesktopView
            data={data}
            mode={mode}
            variant={variant}
            yearIndex={yearIndex}
            years={years}
          />
        </div>
        <div className="block xl:hidden">
          {' '}
          <MobileView
            data={data}
            mode={mode}
            variant={variant}
            yearIndex={yearIndex}
            years={years}
          />
        </div>
      </div>
      <Slider
        default_value={yearIndex}
        labels={years.map(e => e.toString())}
        onValueChange={setYearIndex}
        variant={'primary'}
      />
    </>
  )
}
