import BaseTile, { TilePrefix } from '@/components/Tiles/Ecology/EcologyTile'

import LanternsTitle from './LanternsTitle'
import LanternsContent from './LanternsContent'
import { getTileDatapoint } from '@/lib/api/getTileData'
import { CountType } from './dt'

export default async function LanternsTile() {
  const tile_id = `${TilePrefix}-lanterns`

  const total: CountType = (await getTileDatapoint(tile_id, 'total')) * 1

  return (
    <BaseTile embedId={tile_id} title={<LanternsTitle count={total} />}>
      <LanternsContent count={total} />
    </BaseTile>
  )
}
