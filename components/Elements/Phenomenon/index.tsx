import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import useDevice from '@/hooks/useDevice'
import Phenomena from './Phenomena'
import { PhenomenonProps } from './dt'

export default function Phenomenon({
  phenomenon,
  value,
  meta = '',
  icon,
  size = 'md',
  hide_icon = false,
  animate = true,
  variant = 'primary',
}: PhenomenonProps) {
  const device = useDevice()

  if (!Phenomena[phenomenon]) {
    return <></>
  }

  const {
    title = '',
    unit = '',
    icon: phenomIcon = () => <></>,
    decimals = 0,
    shortTitle = '',
  } = Phenomena[phenomenon]

  const valueSize: 'h1' | 'h4' = size === 'xl' ? 'h1' : 'h4'

  const Icon = icon ? icon : phenomIcon

  return (
    <div className="my-1 flex items-center gap-3 md:my-2">
      {!hide_icon && (
        <Icon
          className={cx(
            size === 'md' ? 'aspect-square' : 'w-6',
            'h-10 fill-live stroke-live md:h-14',
          )}
        />
      )}
      <div>
        <Title
          as={'h6'}
          dangerouslySetInnerHTML={{
            __html: device === 'mobile' && shortTitle ? shortTitle : title,
          }}
          variant={'live'}
        ></Title>
        <Title as={valueSize} variant={variant}>
          {animate && (
            <AnimatedNumber decimals={decimals}>{value}</AnimatedNumber>
          )}
          {!animate && (
            <span>
              {new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: decimals || 0,
              }).format(value)}
            </span>
          )}{' '}
          {unit} {meta}
        </Title>
      </div>
    </div>
  )
}
