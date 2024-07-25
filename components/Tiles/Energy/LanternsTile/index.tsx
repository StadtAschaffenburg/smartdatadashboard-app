import EnergyTile from '../EnergyTile'
import LanternsContent from './LanternsContent'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'

export default async function LanternsTile() {
  const currentCount = 4000

  return (
    <EnergyTile
      dataRetrieval={format(new Date('2023-05-30T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadtwerke Aschaffenburg'}
      embedId="energy-lanterns"
      title={
        <>
          <AnimatedNumber>{currentCount}</AnimatedNumber> Straßenlaternen
        </>
      }
    >
      <LanternsContent></LanternsContent>
    </EnergyTile>
  )
}
