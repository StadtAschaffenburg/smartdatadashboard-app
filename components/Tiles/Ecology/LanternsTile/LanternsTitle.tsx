import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { ContentProps } from './dt'

export default async function LanternsContent({ count }: ContentProps) {
  return (
    <>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> Straßenlaternen
    </>
  )
}
