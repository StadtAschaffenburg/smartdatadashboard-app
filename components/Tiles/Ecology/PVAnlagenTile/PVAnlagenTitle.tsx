import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function PVAnlagenTitle({ count }: { count: number }) {
  return (
    <>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> PV-Anlagen
    </>
  )
}
