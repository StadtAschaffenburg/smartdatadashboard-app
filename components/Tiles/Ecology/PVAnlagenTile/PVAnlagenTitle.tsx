import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default async function LanternsContent({
  capacity,
}: {
  capacity: number
}) {
  return (
    <>
      <AnimatedNumber>{capacity ?? 0}</AnimatedNumber> PV-Anlagen
    </>
  )
}
