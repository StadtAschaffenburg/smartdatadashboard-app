import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default async function LanternsContent({ count }: { count: number }) {
  return (
    <>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> Straßenlaternen
    </>
  )
}
