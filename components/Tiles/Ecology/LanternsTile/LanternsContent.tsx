import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { IconLanterns } from '@/components/Icons/Ecology'

export default async function LanternsContent({ count }: { count: number }) {
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <IconLanterns className="h-20 fill-ecology md:h-32" />
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
