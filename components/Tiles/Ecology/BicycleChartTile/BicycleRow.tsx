import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import BicycleProgress from './BicycleProgress'

type BicycleRowProps = {
  name: string
  count: number
  min: number
  max: number
}

function mapBetween(
  currentNum: number,
  min: number,
  max: number,
  minAllowed = 0,
  maxAllowed = 100,
) {
  return (
    ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
  )
}

export default function BicycleRow({ name, count, min, max }: BicycleRowProps) {
  const progress = mapBetween(count, min * 0.9, max * 1.1)
  name = name.replace(
    'straße',
    '&shy;<span class="whitespace-nowrap">straße</span>',
  )
  name = name.replace('Straße', '<span class="whitespace-nowrap">Straße</span>')

  return (
    <div className="my-2 flex w-full items-end">
      <div className="w-28 flex-none md:w-40">
        <Title
          as={'h5'}
          dangerouslySetInnerHTML={{ __html: name }}
          variant={'primary'}
        />
        <Title as={'h3'} variant={'mobility'}>
          <AnimatedNumber>{count}</AnimatedNumber>
        </Title>
      </div>
      <div className="mb-2 flex-1 md:mb-0">
        <BicycleProgress progress={progress} />
      </div>
    </div>
  )
}
