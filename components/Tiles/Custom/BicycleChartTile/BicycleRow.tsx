import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import BicycleProgress from './BicycleProgress'
import { mapBetween } from '@/utils/convert'
import { BicycleRowProps } from './dt'

export default function BicycleRow({ id, name, count, min, max }: BicycleRowProps) {
  const progress = mapBetween(count, min * 0.9, max * 1.1)
  name = name.replace(
    'straße',
    '&shy;<span class="whitespace-nowrap">straße</span>',
  )
  name = name.replace('Straße', '<span class="whitespace-nowrap">Straße</span>')

  return (
    <div className="my-2 flex w-full items-end" data-id={id}>
      <div className="w-28 flex-none md:w-40">
        <Title
          as={'h5'}
          dangerouslySetInnerHTML={{ __html: name }}
          margin="none"
          variant={'primary'}
          weight="medium"
        />
        <Title as={'h3'} variant={'primary'}>
          <AnimatedNumber>{count}</AnimatedNumber>
        </Title>
      </div>
      <div className="mb-2 flex-1 md:mb-0">
        <BicycleProgress progress={progress} />
      </div>
    </div>
  )
}
