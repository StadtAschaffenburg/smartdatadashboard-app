'use client'

import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import LanternsTitle from './LanternsTitle'
import LanternsContent from './LanternsContent'
import { getDataPoint } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const aktuell: number = getDataPoint(tile_payload, 'aktuell')
  const total: number = getDataPoint(tile_payload, 'total')

  return (
    <BaseTile
      embedId={type}
      tile_payload={tile_payload}
      title={<LanternsTitle count={aktuell} />}
    >
      <LanternsContent count={total} />
    </BaseTile>
  )
}
