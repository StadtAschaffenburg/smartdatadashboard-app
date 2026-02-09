'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'
import Slider from '@/components/Inputs/Slider/'
import { createContext, useEffect, useRef, useState } from 'react'
import Header from './DriveTypeHeader'
import Row from './DriveTypeRow'
import { ChartProps, DriveTypeData } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getVariantType } from '@/utils/payload'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import {
  getDatasetByIndex,
  getDatasetByKey,
  getDataSource,
  TileDatasourceType,
} from '@schleegleixner/react-statamic-api'

export const MaxChartValueContext = createContext(0)

const string_all = 'Alle Jahre'

const drive_types: string[] = [
  'Benzin',
  'Diesel',
  'Elektro',
  'Hybrid',
  'Sonstige',
]

function getDriveTypeData(
  datasource: TileDatasourceType,
  year: string | number,
): {
  results: DriveTypeData[]
  min: number
  max: number
  min_all: number
  max_all: number
  total: number
} {
  const results: DriveTypeData[] = []
  const currentData = getDatasetByIndex(datasource, year)
  let max: number | null = null
  let min: number | null = null
  let max_all: number | null = null
  let min_all: number | null = null
  let total = 0

  drive_types.forEach(type => {
    let value = currentData ? (currentData[type] ?? null) : null

    if (value) {
      value = Number(value)

      if (max === null || value > max) {
        max = value
      }

      if (min === null || value < min) {
        min = value
      }
      total += value
    }

    const dataset_by_key = getDatasetByKey(datasource, type)
    const first_data = dataset_by_key[0] ?? 0
    const latest_data = dataset_by_key.at(-1) ?? 0

    dataset_by_key.forEach(d => {
      if (d !== null && d !== undefined) {
        const num = Number(d)
        if (max_all === null || num > max_all) {
          max_all = num
        }
        if (min_all === null || num < min_all) {
          min_all = num
        }
      }
    })

    value = value ?? 0

    results.push({
      name: type,
      count: value, // for selected year
      data: dataset_by_key,
      change: latest_data - first_data,
    })
  })

  return {
    results,
    min: min ?? 0,
    max: max ?? 0,
    min_all: min_all ?? 0,
    max_all: max_all ?? 0,
    total,
  }
}

export default function DriveTypeContent({ tile_payload }: ChartProps) {
  const datasource = getDataSource(tile_payload)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentHeight = 'auto'

  const [year, setYear] = useState<number | string>('')
  const [years, setYearList] = useState<(number | string)[]>([])
  const [variant, setVariant] = useState<TileVariantTypes>('primary')

  // on load
  useEffect(() => {
    if (!datasource) {
      return
    }
    const timeline: (number | string)[] = datasource.timeline
    setVariant(getVariantType(tile_payload))
    if (!timeline.includes(string_all)) {
      timeline.push(string_all)
    }
    setYearList(timeline)
    setYear(timeline.at(-2) ?? 0)
  }, [datasource])

  if (!datasource || !years.length) {
    return <RequestIndicator />
  }

  const isBar = year === string_all

  const {
    results: drivedata,
    max: current_max,
    min: current_min,
    total: current_total,
    max_all: alltime_max,
  } = getDriveTypeData(datasource, year)

  const alltime_change = drivedata.reduce((acc, cur) => {
    return acc + cur.change
  }, 0)

  return (
    <>
      <Header
        AllYear={years[0]}
        title={
          <span>
            {isBar && alltime_change > 0 && '+'}{' '}
            <AnimatedNumber>
              {isBar ? alltime_change : current_total}
            </AnimatedNumber>
          </span>
        }
        variant={variant}
        year={year}
      />
      <div
        className="overflow-hiddentransition-all duration-[1000ms]"
        style={{ height: `calc(${contentHeight})` }}
      >
        <div ref={contentRef}>
          {isBar && (
            <div className="my-4 flex w-full items-end pr-4 lg:gap-12">
              <div className="w-24 flex-none md:w-32"></div>
              <div className="h-full flex-1 md:mb-0">
                <div className="flex h-full items-end md:items-center lg:items-end">
                  <div className="hidden w-full justify-around xs:flex md:hidden lg:flex">
                    {years.slice(0, -1).map((year, index) => {
                      return (
                        <Text
                          className="sm:text-xxs text-xs font-bold"
                          key={index}
                          variant={'primary'}
                        >
                          {year.toString().slice(2, 4)}
                        </Text>
                      )
                    })}
                  </div>
                  <div className="flex w-full justify-between text-center xs:hidden md:flex lg:hidden">
                    <Text className="sm:text-xs font-bold" variant={variant}>
                      {years.at(0)}
                    </Text>
                    <Text className="sm:text-xs font-bold" variant={variant}>
                      -
                    </Text>
                    <Text className="sm:text-xs font-bold" variant={variant}>
                      {years.at(-2)}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}
          {drivedata.map((dataset, index: number) => (
            <div key={index}>
              <Row
                bar={isBar}
                count={isBar ? dataset.change : dataset.count}
                Listofprogress={dataset.data}
                max={current_max}
                max_total={alltime_max}
                min={current_min}
                name={dataset.name}
                variant={variant}
              />
            </div>
          ))}
        </div>
      </div>

      <Slider
        default_value={years.length - 2}
        labels={years.map(year => year.toString())}
        max={years.length - 1}
        min={0}
        onValueChange={e => {
          setYear(years[e])
        }}
        variant={variant}
      />
    </>
  )
}
