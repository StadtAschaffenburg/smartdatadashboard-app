import Title from '@/components/Elements/Title'
import { cva, VariantProps } from 'class-variance-authority'

const liveBadgeStyle = cva(
  'flex w-fit items-center gap-1 rounded-lg pl-2 pr-3 py-0.5 text-white tracking-wider',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        mobility: 'bg-mobility',
        successStory: 'bg-primary',
        climate: 'bg-climate',
        building: 'bg-buildings',
        energy: 'bg-energy',
        data: 'bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type LiveBadgeProps = VariantProps<typeof liveBadgeStyle>

function PulsatingCircle() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" fill="none" r="10" stroke="#fff" strokeWidth="2">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          from="8"
          repeatCount="indefinite"
          to="20"
        />
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1.5s"
          from="1"
          repeatCount="indefinite"
          to="0"
        />
      </circle>
      <circle cx="20" cy="20" fill="#fff" r="10" />
    </svg>
  )
}

export default function LiveBadge({ variant }: LiveBadgeProps) {
  return (
    <div className={liveBadgeStyle({ variant })}>
      <div className="flex h-5 w-5 items-center justify-center">
        <PulsatingCircle />
      </div>
      <Title as="h7" font={'semibold'} variant={'inverse'}>
        LIVE
      </Title>
    </div>
  )
}
