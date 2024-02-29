'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'

import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useWindowSize } from 'react-use'
// @ts-ignore
import AwmEMobility from '@/assets/data/awm-e-mobilitaet.csv'
import { useEffect, useState } from 'react'
import { MsKlimadashboardIconsMAwmAbgas, MsKlimadashboardIconsMAwmElektro } from '@/components/Icons/Mobilitaet'

type AwmDatatType = {
  ZEIT: number
  'AWM Fahrzeuge - Dieselantrieb': number
  'AWM Fahrzeuge - Elektroantrieb': number
  'AWM Fahrzeuge - Erdgasantrieb': number
}

export default function AWMContent() {
  // const { electroCount, combustionCount } = useBusData()
  const { width } = useWindowSize()
  const [yearIndex, setYearIndex] = useState(2)

  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)

  const data: AwmDatatType[] = AwmEMobility

  useEffect(() => {
    if (!data) {
      return
    }
    const row: AwmDatatType = data[yearIndex]
    setElectroCount(row['AWM Fahrzeuge - Elektroantrieb'])
    setCombustionCount(row['AWM Fahrzeuge - Dieselantrieb'])
  }, [data, yearIndex])

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
            Fahrzeuge mit Elektroantrieb
          </Title>
          <AnimatedNumber className="text-2xl text-mobility">
            {electroCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="flex aspect-[7/4] w-full items-end rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${
              (combustionCount / (electroCount + combustionCount) || 0.5) * 100
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
