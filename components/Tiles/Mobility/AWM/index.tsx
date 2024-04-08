import { format } from 'date-fns'
import { Spacer } from '@/components/Elements/Spacer'
import MobilityTile from '../MobilityTile'
import AWMContent from './AWMContent'
import Title from '@/components/Elements/Title'
import getTileData from '@/lib/api/getTileData'

export default async function AWMTile() {
  const data = await getTileData('mobility-awm')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataRetrieval={format(new Date('2024-04-01T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource="Stadtwerke Aschaffenburg"
      embedId="mobility-awm"
      subtitle="Anzahl der elektrisch angetriebenen Nutzfahrzeuge im Vergleich zu Fahrzeugen mit fossilem Antrieb"
      title="E-Mobilität"
    >
      <AWMContent />
      <Spacer size={'lg'} />
      <Title as="h5">{infoText}</Title>
    </MobilityTile>
  )
}
