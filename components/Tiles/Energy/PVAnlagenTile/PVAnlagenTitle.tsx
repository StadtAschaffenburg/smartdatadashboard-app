import 'server-only'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { getTileDatapoint } from '@/lib/api/getTileData'

export default async function LanternsContent() {
  const count = (await getTileDatapoint('energy-pvanlagen', 'anzahl')) * 1

  return (
    <>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> PV-Anlagen
    </>
  )
}
