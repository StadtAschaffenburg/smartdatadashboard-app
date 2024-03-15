import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import BicycleChartContent from './BicycleChartContent'
import getTileData from '@/lib/api/getTileData'

export default async function BicycleChartTile() {
  const data = await getTileData('mobility-bicycle')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataSource="Stadt Aschaffenburg &ndash; Amt für Mobilität und Tiefbau"
      embedId="mobility-bicycle"
      live
      subtitle="im Stadtgebiet"
      title="Radler*innen"
    >
      <>
        <BicycleChartContent />
        <Spacer size={'lg'} />
        <Title as="h5">{infoText}</Title>
      </>
    </MobilityTile>
  )
}
