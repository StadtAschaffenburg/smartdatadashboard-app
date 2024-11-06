'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { IconBusAbgas, IconBusElektro } from '@/components/Icons/Ecology'
import { BusContentProps, BusDataType } from './dt'
import { Spinner } from '@/components/Elements/Spinner'

export default function BusContent({ data }: BusContentProps) {
  const { width } = useWindowSize()
  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)
  const [alternativeCount, setAlternativeCount] = useState(0)
  const [hybridCount, setHybridCount] = useState(0)
  const years: string[] = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  useEffect(() => {
    const row: BusDataType = data[yearIndex]

    setElectroCount(parseInt(row.elektro.toString(), 10))
    setHybridCount(parseInt(row.hybrid.toString(), 10))
    setAlternativeCount(parseInt(row.alternativ.toString(), 10))
    setCombustionCount(parseInt(row.fossil.toString(), 10))
  }, [data, yearIndex])

  if (!data) {
    return <Spinner />
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5" variant={'ecology'}>
            Fahrzeuge mit fossilem Antrieb
          </Title>
          <AnimatedNumber className="text-mobility text-2xl">
            {combustionCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5" variant={'ecology'}>
            Fahrzeuge mit alternativem Antrieb
          </Title>
          <AnimatedNumber className="text-mobility text-2xl">
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
          <IconBusAbgas className="w-full fill-ecology" />
        </div>
        <div className="flex-1">
          <IconBusElektro className="w-full fill-green" />
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
          variant={'ecology'}
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
          variant={'ecology'}
        />
      )}
      <Spacer />
    </div>
  )
}
