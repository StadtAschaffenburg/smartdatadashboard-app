'use client'

import Switch from '@/components/Inputs/Switch'
import { useEffect, useState } from 'react'
import Chart from './Chart'
import { animated, useSpring } from '@react-spring/web'
import { ProgressCircle } from '@/components/Charts/Progress/ProgressCircle'
import AnimatedRollingElement from '@/components/Elements/Animated/AnimatedRollingElement'
import Text from '@/components/Elements/Text'
import { ChartContainerProps, InputDataType, TransformedDataType } from './dt'
import { getVariantType, PayloadDataType } from '@/utils/payload'
import {
  getSource,
  sanitizeName,
  sanitizeNumber,
} from '@schleegleixner/react-statamic-api'

function getOtherCities(
  StadtradelnData: TransformedDataType,
  main_city: string,
): InputDataType[] {
  return Object.keys(StadtradelnData)
    .filter(k => k !== main_city)
    .map(k => StadtradelnData[k] as InputDataType)
}

const transformCsvData = (input: PayloadDataType[]): TransformedDataType => {
  return input.reduce(
    (result, item) => {
      const { Stadtnamen, ...years } = item
      const sanitizedKey = sanitizeName(Stadtnamen ?? '')

      const data = Object.entries(years)
        .filter(([key, value]) => !isNaN(Number(key)) && value !== undefined)
        .map(([year, km]) => ({
          year: Number(year),
          km: sanitizeNumber(km, 0) > 0 ? sanitizeNumber(km) : '', // filter out 0 values
        }))

      if (data.length > 0) {
        result[sanitizedKey] = {
          name: Stadtnamen ?? '',
          data,
        }
      }

      return result
    },
    {} as Record<string, InputDataType>,
  )
}

const findMaxKm = (data: TransformedDataType, key?: string): number => {
  if (key) {
    const entry = data[key]
    if (!entry) {
      return 0
    }
    const maxKm = Math.max(
      ...entry.data.map(item => sanitizeNumber(item.km, 0)),
      0,
    )
    return maxKm
  }

  const maxKm = Object.values(data).reduce((max, entry) => {
    const entryMax = Math.max(
      ...entry.data.map(item => sanitizeNumber(item.km, 0)),
      0,
    )
    return Math.max(max, entryMax)
  }, 0)

  return maxKm
}

const COMPARE_INTERVAL = 5000
const AnimatedProgressCircle = animated(ProgressCircle)

export default function ChartContainer({ tile_payload }: ChartContainerProps) {
  const CsvData: PayloadDataType[] = getSource(tile_payload)
  const variant = getVariantType(tile_payload)

  const main_city = CsvData[0]?.Stadtnamen.toLowerCase() // get the first city as main city
  const StadtradelnData = CsvData ? transformCsvData(CsvData) : {}
  const otherCities = getOtherCities(StadtradelnData, main_city)
  const maxKmMain = findMaxKm(StadtradelnData, main_city)
  const maxKmAll = findMaxKm(StadtradelnData)

  const [compare, setCompare] = useState(false)
  const [otherData, setOtherData] = useState<InputDataType>()
  const [otherIndex, setOtherIndex] = useState(0)

  const [springs, api] = useSpring(() => ({
    from: { progress: 0 },
    to: { progress: 100 },
    config: {
      duration: COMPARE_INTERVAL,
    },
  }))

  useEffect(() => {
    if (!compare) {
      setOtherData(undefined)
      return
    }

    const restartProgress = () => {
      setOtherIndex(prevIndex => prevIndex + 1)
      api.stop()
      api.set({ progress: 0 })
      api.start({
        progress: 100,
        config: {
          duration: COMPARE_INTERVAL,
        },
      })
    }

    restartProgress()
    const timer = setInterval(restartProgress, COMPARE_INTERVAL)

    return () => clearInterval(timer)
  }, [compare])

  useEffect(() => {
    if (!compare) {
      setOtherData(undefined)
      return
    }

    if (otherIndex >= otherCities.length) {
      setOtherIndex(0)
      return
    }

    setOtherData(otherCities[otherIndex])
  }, [otherIndex])

  return (
    <div className="rounded bg-white p-2">
      <div className="flex h-[350px] w-full items-center justify-center md:h-[500px]">
        <Chart
          compare={compare}
          data={StadtradelnData[main_city]}
          max={compare ? maxKmAll : maxKmMain}
          other={otherData}
        />
      </div>
      <div className="flex items-center gap-2 p-4 md:gap-10 md:pl-8">
        <div className="h-1 w-8 rounded bg-green md:w-[52px]" />
        <Text as={'h5'} variant={'primary'}>
          Geradelte Kilometer in Frankfurt
        </Text>
      </div>
      {otherCities.length > 0 && (
        <div className="flex w-full flex-col justify-between gap-2 rounded border border-dashed border-primary p-2 md:flex-row md:items-center md:space-x-4 md:p-4 md:pl-8">
          <div className="flex flex-shrink-0 items-center gap-2 md:gap-10">
            <Switch
              aria_label={'Städtevergleich'}
              defaultChecked={compare}
              onCheckedChange={setCompare}
              variant={variant}
            />
            <Text as={'h5'} variant={'primary'}>
              Städtevergleich
            </Text>
          </div>
          {otherData && (
            <div className="flex flex-1 items-center">
              <div className="relative h-6 flex-1">
                <AnimatedRollingElement>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="bg-purple h-1 w-9 rounded md:w-[52px]" />
                    <Text as="h5" variant={'primary'}>
                      {otherData.name}
                    </Text>
                  </div>
                </AnimatedRollingElement>
              </div>

              <AnimatedProgressCircle {...springs} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
