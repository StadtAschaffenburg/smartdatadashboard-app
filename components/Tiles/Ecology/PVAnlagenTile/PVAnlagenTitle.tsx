import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { ContentProps } from './dt'

export default async function LanternsContent({ capacity }: ContentProps) {
  return (
    <>
      <AnimatedNumber>{capacity ?? 0}</AnimatedNumber> PV-Anlagen
    </>
  )
}
