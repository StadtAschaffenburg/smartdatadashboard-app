import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <div className="text-center">
        <div className="w-full rounded border-2 border-secondary p-3 text-center font-bold text-secondary">
          Der Kachel-Typ {tile_payload.tile_type} wurde nicht gefunden.
        </div>
      </div>
    </IconTile>
  )
}
