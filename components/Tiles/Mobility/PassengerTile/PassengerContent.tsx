'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import {
  MsKlimadashboardIconsMoepnv,
  MsKlimadashboardIconsMoepnvGast,
} from '@/components/Icons/Mobilitaet'

import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

interface PassengerDataProps {
  ZEIT: number
  value: number
}

const data: PassengerDataProps[] = [
  {
    ZEIT: 2018,
    value: 8.5,
  },
  {
    ZEIT: 2019,
    value: 8.3,
  },
  {
    ZEIT: 2020,
    value: 8.4,
  },
  {
    ZEIT: 2021,
    value: 5.0,
  },
  {
    ZEIT: 2022,
    value: 4.4,
  },
  {
    ZEIT: 2023,
    value: 5.3,
  },
]

export default function PassengerContent() {
  const { width } = useWindowSize()
  const years = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [passengerValue, setPassengerValue] = useState(0)

  useEffect(() => {
    setPassengerValue(data[yearIndex].value)
  }, [yearIndex])
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <MsKlimadashboardIconsMoepnv className="h-20 fill-primary md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as="h3" variant={'mobility'}>
            <AnimatedNumber decimals={2}>{passengerValue}</AnimatedNumber> Mio
          </Title>
          <div className="flex justify-end gap-1 pb-4">
            <span>
              <MsKlimadashboardIconsMoepnvGast className="h-10 fill-primary lg:h-14" />
            </span>
            <span>
              <MsKlimadashboardIconsMoepnvGast className="h-10 fill-primary lg:h-14" />
            </span>
            <span>
              <MsKlimadashboardIconsMoepnvGast className="h-10 fill-primary lg:h-14" />
            </span>
            <span>
              <MsKlimadashboardIconsMoepnvGast className="hidden h-10 fill-primary lg:block lg:h-14" />
            </span>
          </div>
          {width >= 1800 && (
            <Slider
              defaultValue={[years.length - 1]}
              firstValueMobile={years.length - 1}
              labels={years}
              max={years.length - 1}
              min={0}
              onValueChange={([e]) => {
                setYearIndex(e)
              }}
              variant={'mobility'}
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        {width < 1800 && (
          <MobileSlider
            defaultValue={[years.length - 1]}
            firstValueMobile={years.length - 1}
            labels={years}
            max={years.length - 1}
            min={0}
            onValueChange={([e]) => {
              setYearIndex(e)
            }}
            variant={'mobility'}
          />
        )}
      </div>
    </div>
  )
}
