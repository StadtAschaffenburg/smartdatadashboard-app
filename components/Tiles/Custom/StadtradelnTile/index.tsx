import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import ChartContainer from './ChartContainer'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <ChartContainer tile_payload={tile_payload} />
    </IconTile>
  )
}
