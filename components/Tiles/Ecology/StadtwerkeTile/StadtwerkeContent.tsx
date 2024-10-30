'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'

import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import {
  MsKlimadashboardIconsMAwmAbgas,
  MsKlimadashboardIconsMAwmElektro,
} from '@/components/Icons/Mobilitaet'
import { ContentProps, InputData } from './dt'

export default function StadtwerkeContent({ data }: ContentProps) {
  const { width } = useWindowSize()

  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)
  const [hybridCount, setHybridCount] = useState(0)
  const [LNGCount, setLNGCount] = useState(0)
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  useEffect(() => {
    const row: InputData = data[yearIndex]
    setElectroCount(parseInt(row.Elektroantrieb.toString(), 10))
    setHybridCount(parseInt(row.Hybridantrieb.toString(), 10))
    setCombustionCount(parseInt(row.Dieselantrieb.toString(), 10))
    setLNGCount(parseInt(row.Erdgasantrieb.toString(), 10))
  }, [data, yearIndex])

  if (!data) {
    return <p>Lade...</p>
  }

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
            {hybridCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="flex aspect-[7/4] w-full items-end rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${
              (combustionCount /
                (hybridCount + electroCount + LNGCount + combustionCount) ||
                0.5) * 100
            }%`,
          }}
        >
          <MsKlimadashboardIconsMAwmAbgas className="w-full" />
        </div>
        <div className="flex-1">
          <MsKlimadashboardIconsMAwmElektro className="w-full" />
        </div>
      </div>
      {width < 1800 && (
        <MobileSlider
          defaultValue={[yearIndex]}
          firstValueMobile={data.length - 1}
          labels={data.map(e => e.ZEIT.toString())}
          max={data.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          variant={'mobility'}
        />
      )}
      {width >= 1800 && (
        <Slider
          defaultValue={[yearIndex]}
          firstValueMobile={data.length - 1}
          labels={data.map(e => e.ZEIT.toString())}
          max={data.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          variant={'mobility'}
        />
      )}
    </div>
  )
}
