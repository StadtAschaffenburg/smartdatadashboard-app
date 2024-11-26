import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import PVAnlagenContent from './PVAnlagenContent'
import DynamicText from '@/components/Elements/DynamicText'

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
      <PVAnlagenContent tile_payload={tile_payload} />
    </BaseTile>
  )
}
