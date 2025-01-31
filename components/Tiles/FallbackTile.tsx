import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <div className="text-center">
        <div className="w-full rounded border-2 border-secondary p-3 text-center font-bold text-secondary">
          Der Kachel-Typ wurde nicht gefunden.
        </div>
      </div>
    </BaseTile>
  )
}
