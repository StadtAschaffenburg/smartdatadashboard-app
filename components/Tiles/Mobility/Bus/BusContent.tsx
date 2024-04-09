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
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  /* const [content_strings, setContentStrings] = useState<TileContentStrings[]>(
    [],
  ) */
  //       <Title as="h5">{(content_strings as any).copy ?? 'Lade...'}</Title>

  /*useEffect(() => {
    const getStrings = async () => {
      const response = await getTileStrings('mobilitat-e-busse')
      setContentStrings(response)
    }

    getStrings()
  }, []) */

  useEffect(() => {
    if (!data) {
      return
    }
    const row: BusDataType = data[yearIndex]

    setElectroCount(row.elektro)
    setHybridCount(row.hybrid)
    setAlternativeCount(row.alternativ)
    setCombustionCount(row.fossil)
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
          defaultValue={[yearIndex]}
          firstValueMobile={data.length - 1}
          labels={data.map(e => e.ZEIT.toString())}
          max={data.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          value={[yearIndex]}
          variant={'mobility'}
        />
      )}
      {width >= 1800 && (
        <Slider
          firstValueMobile={3} //ONLY FOR DEMO
          labels={data.map(e => e.ZEIT.toString())}
          max={data.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          value={[yearIndex]}
          variant={'mobility'}
        />
      )}
      <Spacer />
    </div>
  )
}
