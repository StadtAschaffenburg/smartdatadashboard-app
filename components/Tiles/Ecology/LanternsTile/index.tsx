'use client'

import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import DynamicText from '@/components/Elements/DynamicText'
import LanternsContent from './LanternsContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile
      embedId={type}
      tile_payload={tile_payload}
      title={
        <DynamicText tile_payload={tile_payload}>
          {tile_payload.title ?? ''}
        </DynamicText>
      }
    >
      <LanternsContent tile_payload={tile_payload} />
    </BaseTile>
  )
}
