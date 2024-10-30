import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'

import LanternsTitle from './LanternsTitle'
import LanternsContent from './LanternsContent'

export default async function LanternsTile() {
  const tile_id = `${TilePrefix}-lanterns`

  return (
    <BaseTile embedId={tile_id} title={<LanternsTitle />}>
      <LanternsContent></LanternsContent>
    </BaseTile>
  )
}
