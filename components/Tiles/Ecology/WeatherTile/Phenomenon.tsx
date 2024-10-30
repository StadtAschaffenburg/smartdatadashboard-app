import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import useDevice from '@/hooks/useDevice'

import { phenomena, PhenomenonProps } from './dt'

export default function Phenomenon({
  phenomenon,
  value,
  meta = '',
  size = 'md',
  hide_icon = false,
}: PhenomenonProps) {
  const { title, unit, icon, decimals, shortTitle } = phenomena[phenomenon]

  const valueSize: 'h1' | 'h4' = size === 'xl' ? 'h1' : 'h4'

  const device = useDevice()

  const Icon = icon
  return (
    <div className="my-1 flex items-center gap-3 md:my-2">
      {!hide_icon && (
        <Icon
          className={cx(
            size === 'md' ? 'aspect-square' : 'w-6',
            'h-10 fill-primary stroke-primary text-primary md:h-14',
          )}
        />
      )}
      <div>
        <Title
          as={'h5'}
          dangerouslySetInnerHTML={{
            __html: device === 'mobile' && shortTitle ? shortTitle : title,
          }}
          variant={'primary'}
        ></Title>
        <Title as={valueSize} variant="climate">
          <AnimatedNumber decimals={decimals}>{value}</AnimatedNumber> {unit}{' '}
          {meta}
        </Title>
      </div>
    </div>
  )
}
