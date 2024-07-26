import 'server-only'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { getTileDatapoint } from '@/lib/api/getTileData'
import { MsKlimadashboardIconsEPvLanterns } from '@/components/Icons/Energie'

export default async function LanternsContent() {
  const count = (await getTileDatapoint('energie-laternen', 'total')) * 1

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <MsKlimadashboardIconsEPvLanterns className="h-20 text-energy md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as={'subtitle'}>
            in Aschaffenburg sind bereits mit modernster LED-Technik
            ausgestattet. Die Stadt Aschaffenburg saniert nach und nach all rund{' '}
            <span className="text-energy">
              <AnimatedNumber>{count ?? 0}</AnimatedNumber> Straßenlaternen
            </span>{' '}
            im Stadtgebiet mit LED-Technik, um Energie zu sparen und den
            CO2-Ausstoß zu mindern
          </Title>
        </div>
      </div>
    </div>
  )
}
