import 'server-only'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { MsKlimadashboardIconsEPvGebaeude } from '@/components/Icons/Energie'
import { getTileDatapoint } from '@/lib/api/getTileData'

export default async function PVAnlagenContent() {
  const capacity =
    (await getTileDatapoint('energy-pvanlagen', 'kapazitaet')) * 1

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
              <AnimatedNumber decimals={0}>{capacity ?? 0}</AnimatedNumber> kWp.
            </span>{' '}
          </Title>
        </div>
      </div>
    </div>
  )
}
