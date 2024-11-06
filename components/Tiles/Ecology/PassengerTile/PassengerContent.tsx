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
import { PassengerContentProps } from './dt'

export default function PassengerContent({ data }: PassengerContentProps) {
  const { width } = useWindowSize()
  const years = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )
  const [passengerValue, setPassengerValue] = useState(0)

  useEffect(() => {
    setPassengerValue(data[yearIndex].value / 1000000)
  }, [yearIndex])
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <MsKlimadashboardIconsMoepnv className="h-20 fill-primary md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as="h3" variant={'ecology'}>
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
              variant={'ecology'}
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
            variant={'ecology'}
          />
        )}
      </div>
    </div>
  )
}
