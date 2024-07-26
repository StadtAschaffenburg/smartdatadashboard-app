import EnergyTile from '../EnergyTile'
import PVAnlagenTitle from './PVAnlagenTitle'
import PVAnlagenContent from './PVAnlagenContent'

export default function PVAnlagenTile() {
  return (
    <EnergyTile
      dataRetrieval=""
      dataSource={'Stadt Aschaffenburg'}
      embedId="energy-PVAnlagen"
      title={<PVAnlagenTitle />}
    >
      <PVAnlagenContent></PVAnlagenContent>
    </EnergyTile>
  )
}
