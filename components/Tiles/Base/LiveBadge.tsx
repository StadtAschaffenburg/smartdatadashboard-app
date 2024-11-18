import Text from '@/components/Elements/Text'
import { cva, VariantProps } from 'class-variance-authority'
import {
  BackgroundDefaultVariants,
  BackgroundVariants,
} from '@/utils/variants/BackgroundVariants'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'

const liveBadgeStyle = cva(
  'flex w-fit items-center gap-1 rounded-lg pl-2 pr-3 py-0.5 text-white tracking-wider',
  {
    variants: BackgroundVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

type LiveBadgeProps = VariantProps<typeof liveBadgeStyle>

export default function LiveBadge({ variant }: LiveBadgeProps) {
  return (
    <div className={liveBadgeStyle({ variant })}>
      <div className="flex h-5 w-5 items-center justify-center">
        <PulsatingCircle />
      </div>
      <Text as="h7" font={'semibold'} variant={'inverse'}>
        LIVE
      </Text>
    </div>
  )
}
