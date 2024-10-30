import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'

export default function PVAnlagenTile() {
  return (
    <BaseTile
      dataRetrieval=""
      dataSource={'Stadt Aschaffenburg'}
      embedId="energy-pvanlagen"
      title={<PVAnlagenTitle />}
    >
      <PVAnlagenContent></PVAnlagenContent>
    </BaseTile>
  )
}
