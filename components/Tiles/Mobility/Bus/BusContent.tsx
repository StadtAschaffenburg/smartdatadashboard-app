'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
// @ts-ignore
import BusData from '@/assets/data/stadtwerke-bus-fahrzeuge-neu.csv'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import {
  MsKlimadashboardIconsMBusAbgas,
  MsKlimadashboardIconsMBusElektro,
} from '@/components/Icons/Mobilitaet'
// import { getTileStrings, TileContentStrings } from '@/lib/api/getTileData'

type BusDataType = {
  ZEIT: string
  total: number
  fossil: number
  hybrid: number
  alternativ: number
  elektro: number
}

export default function BusContent() {
  const { width } = useWindowSize()
  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)
  const [alternativeCount, setAlternativeCount] = useState(0)
  const [hybridCount, setHybridCount] = useState(0)

  const data: BusDataType[] = BusData
  const years: string[] = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(0)

  useEffect(() => {
    const row: BusDataType = data[yearIndex]

    setElectroCount(row.elektro)
    setHybridCount(row.hybrid)
    setAlternativeCount(row.alternativ)
    setCombustionCount(row.fossil)
  }, [data, yearIndex])

  if (data) {
    return (
      <div>
        <div className="flex justify-between">
          <div>
            <Title as="h5" variant={'primary'}>
              Fahrzeuge mit fossilem Antrieb
            </Title>
            <AnimatedNumber className="text-2xl text-mobility">
              {combustionCount}
            </AnimatedNumber>
          </div>
          <div className="flex flex-col items-end">
            <Title as="h5" variant={'primary'}>
              Fahrzeuge mit alternativem Antrieb
            </Title>
            <AnimatedNumber className="text-2xl text-mobility">
              {electroCount + hybridCount + alternativeCount}
            </AnimatedNumber>
          </div>
        </div>
        <div className="flex aspect-[5/2] w-full items-end rounded bg-white p-4">
          <div
            className="flex-none transition-all"
            style={{
              width: `${
                (combustionCount /
                  (electroCount +
                    hybridCount +
                    alternativeCount +
                    combustionCount) || 0.5) * 100
              }%`,
            }}
          >
            <MsKlimadashboardIconsMBusAbgas className="w-full" />
          </div>
          <div className="flex-1">
            <MsKlimadashboardIconsMBusElektro className="w-full" />
          </div>
        </div>
        {width < 1800 && (
          <MobileSlider
            defaultValue={[years.length - 1]}
            firstValueMobile={years.length - 1}
            labels={years}
            max={years.length - 1}
            min={0}
            onValueChange={([index]) => setYearIndex(index)}
            variant={'mobility'}
          />
        )}
        {width >= 1800 && (
          <Slider
            defaultValue={[years.length - 1]}
            firstValueMobile={years.length - 1}
            labels={years}
            max={years.length - 1}
            min={0}
            onValueChange={([index]) => setYearIndex(index)}
            variant={'mobility'}
          />
        )}
        <Spacer />
      </div>
    )
  }

  return <p>Lade...</p>
}
