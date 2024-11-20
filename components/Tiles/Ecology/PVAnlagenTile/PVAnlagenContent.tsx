import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { IconPv } from '@/components/Icons/Ecology'

export default function PVAnlagenContent({ capacity }: { capacity: number }) {
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <IconPv className="h-20 fill-ecology md:h-32" />
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
