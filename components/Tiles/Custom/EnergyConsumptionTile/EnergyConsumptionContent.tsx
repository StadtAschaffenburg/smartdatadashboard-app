'use client'

import { useEffect, useState } from 'react'
import Slider from '@/components/Inputs/Slider'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { BuildingDataType, DataType, EnergyConsumptionContentProps } from './dt'
import {
  convertToUnixTimestamp,
  InputDataType,
  sanitizeNumber,
  TableRowType,
  TileDatasourceType
} from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'
import ToggleGroup from '@/components/Inputs/ToggleGroup'

import {
  getDataSource,
  TileProps,
} from '@schleegleixner/react-statamic-api'

function convertData(data: InputDataType[], table_rows: TableRowType[]): any[] {
  return data.map((d: InputDataType) => {
    const converted_row: { [key: string]: any } = {
      datum: convertToUnixTimestamp(d.INDEX) * 1000,
      year: new Date(convertToUnixTimestamp(d.INDEX) * 1000).getFullYear(),
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
  stromData: TileDatasourceType,
  waermeData: TileDatasourceType,
  year: number,
  table_rows: TableRowType[],
): BuildingDataType {
  const result: BuildingDataType = {} as BuildingDataType

  for (const mode of ['strom', 'waerme'] as const) {
    const data: DataType[] = mode === 'strom' ? stromData : waermeData

    const currentYearData = data.filter(
      d => year === d.year,
    )
    const previousYearData = data.filter(
      d => year - 1 === d.year,
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
  tile_payload,
}: EnergyConsumptionContentProps) {
  const [mode, setMode] = useState<'strom' | 'waerme'>('strom')
  
  const variant = getVariantType(tile_payload)
  
  const stromDataInput = getDataSource(tile_payload, 0)
  const waermeDataInput = getDataSource(tile_payload, 1)

  const table_rows =
    tile_payload.datasources && tile_payload.datasources[0]?.table_rows
      ? tile_payload.datasources[0].table_rows
      : []

  const waermeData: DataType[] =
    waermeDataInput && table_rows
      ? convertData(waermeDataInput.content, table_rows)
      : []
  const stromData: DataType[] =
    stromDataInput && table_rows ? convertData(stromDataInput.content, table_rows) : []

  const years = setYears(mode === 'strom' ? stromData : waermeData)

  const [yearIndex, setYearIndex] = useState<number>(years.length - 1)
  
  useEffect(() => {
    if (!years.includes(years[yearIndex])) {
      setYearIndex(years.length - 1)
    }
  }, [years])

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
      <div className="absolute -top-4 right-0 w-full md:-top-6 md:w-96">
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
            label='Umschalter zwischen Strom und Wärme'
            onChange={value => setMode(value as 'strom' | 'waerme')}
            variant={variant}
          ></ToggleGroup>
        </div>
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
      <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
    </>
  )
}
