import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import LanternsTitle from './LanternsTitle'
import LanternsContent from './LanternsContent'

export default async function LanternsTile() {
  return (
    <BaseTile
      dataRetrieval=""
      dataSource={'Stadtwerke Aschaffenburg'}
      embedId="energy-lanterns"
      title={<LanternsTitle />}
    >
      <LanternsContent></LanternsContent>
    </BaseTile>
  )
}
