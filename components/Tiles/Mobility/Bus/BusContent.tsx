'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
// @ts-ignore
import BusData from '@/assets/data/stadtwerke-bus-fahrzeuge.csv'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { MsKlimadashboardIconsMBusAbgas, MsKlimadashboardIconsMBusElektro } from '@/components/Icons/Mobilitaet'

type BusDataType = {
  ZEIT: string
  'Fahrzeuge Alternative Antriebe Elektro': number
  'Fahrzeuge Alternative Antriebe Gesamt': number
  'Fahrzeuge Alternative Antriebe H2': number
  'Fahrzeuge Alternative Antriebe Hybrid': number
  'Fahrzeuge SWMS': number
  'Fahrzeuge Sub': number
  'Fahrzeuge awm - Alternativer Antrieb': number
  'Fahrzeuge awm - Verbrenner': number
}

export default function BusContent() {
  // const { electroCount, combustionCount } = useBusData()
  const { width } = useWindowSize()
  const [yearIndex, setYearIndex] = useState(0)
  const [combustionCount, setCombustionCount] = useState(0)
  const [electroCount, setElectroCount] = useState(0)

  const data: BusDataType[] = BusData
  const [reducedData, setReducedData] = useState<BusDataType[]>([])

  useEffect(() => {
    if (!data) {
      return
    }
    const reducedDataLocal: BusDataType[] = []
    let currentYear = ''
    data.forEach(item => {
      if (currentYear === item.ZEIT.toString().substring(0, 4)) {
        return
      }
      currentYear = item.ZEIT.toString().substring(0, 4)
      const row: BusDataType | undefined = data
        .slice()
        .reverse()
        .find(item => item.ZEIT.toString().substring(0, 4) === currentYear)
      if (
        row &&
        row['Fahrzeuge SWMS'] &&
        row['Fahrzeuge Alternative Antriebe Elektro']
      ) {
        reducedDataLocal.push({ ...row, ZEIT: currentYear })
      }
    })
    setReducedData(reducedDataLocal)
    setYearIndex(reducedDataLocal.length - 1)
  }, [data])

  useEffect(() => {
    if (!reducedData) {
      return
    }
    const row: BusDataType = reducedData[yearIndex]
    if (row) {
      setElectroCount(row['Fahrzeuge Alternative Antriebe Elektro'])
      setCombustionCount(
        row['Fahrzeuge SWMS'] - row['Fahrzeuge Alternative Antriebe Elektro'],
      )
    }
  }, [yearIndex, reducedData])

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
      <div className="flex aspect-[5/2] w-full items-end rounded bg-white p-4">
        <div
          className="flex-none transition-all"
          style={{
            width: `${
              (combustionCount / (electroCount + combustionCount) || 0.5) * 100
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
          firstValueMobile={3} // ONLY FOR DEMO
          labels={reducedData.map(e => e.ZEIT.toString())}
          max={reducedData.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          value={[yearIndex]}
          variant={'mobility'}
        />
      )}
      {width >= 1800 && (
        <Slider
          firstValueMobile={3} //ONLY FOR DEMO
          labels={reducedData.map(e => e.ZEIT.toString())}
          max={reducedData.length - 1}
          min={0}
          onValueChange={([index]) => setYearIndex(index)}
          value={[yearIndex]}
          variant={'mobility'}
        />
      )}
      <Spacer />
      <Title as="h5">
        Busfahren ist Klimaschutz. Damit die Umweltbilanz noch besser wird,
        setzen die Stadtwerke auf Elektrobusse mit Ökostrom. Bis 2029 soll die
        Stadtwerke-Flotte komplett elektrisch fahren.
      </Title>
    </div>
  )
}
