import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ModalSplitChart from './ModalSplitChart'
import Title from '@/components/Elements/Title'
import { TileSplitView } from '../../Base/TileSplitView'
import getTileData from '@/lib/api/getTileData'

export default async function ModalSplitTile() {
  const data = await getTileData('mobility-modalSplit')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataRetrieval="22.05.2023"
      dataSource="Stadt Münster &ndash; Amt für Mobilität und Tiefbau"
      embedId="mobility-modalSplit"
      subtitle="Aufteilung der zurückgelegten Wege und Kilometer der Münsteraner*innen"
      title={'Unterwegs'}
    >
      <TileSplitView>
        <TileSplitView.Left>
          <ModalSplitChart />
        </TileSplitView.Left>
        <TileSplitView.Right>
          <Title as="h5" variant={'dark'}>
            {infoText}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </MobilityTile>
  )
}
