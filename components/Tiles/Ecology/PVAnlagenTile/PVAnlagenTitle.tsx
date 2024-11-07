import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default async function PVAnlagenTitle({ count }: { count: number }) {
  return (
    <>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> PV-Anlagen
    </>
  )
}
