import EnergyTile from '../EnergyTile'
import LanternsTitle from './LanternsTitle'
import LanternsContent from './LanternsContent'

export default async function LanternsTile() {
  return (
    <EnergyTile
      dataRetrieval=""
      dataSource={'Stadtwerke Aschaffenburg'}
      embedId="energy-lanterns"
      title={<LanternsTitle />}
    >
      <LanternsContent></LanternsContent>
    </EnergyTile>
  )
}
