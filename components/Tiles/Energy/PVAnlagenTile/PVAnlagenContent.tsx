'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'

// @ts-ignore
import PVData from '@/assets/data/pv-anlagen.csv'
import { PVAnlagenDataType } from '.'
import { MsKlimadashboardIconsEPvGebaeude } from '@/components/Icons/Energie'

export default function PVAnlagenContent() {
  const [data] = PVData as PVAnlagenDataType[]

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <MsKlimadashboardIconsEPvGebaeude className="h-20 text-energy md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as={'subtitle'}>
            sind im Moment auf Gebäuden der Stadtverwaltung installiert. Das
            entspricht einer Leistung von{' '}
            <span className="text-energy">
              <AnimatedNumber decimals={0}>{data.Leistung}</AnimatedNumber> kWp.
            </span>{' '}
          </Title>
        </div>
      </div>
    </div>
  )
}
