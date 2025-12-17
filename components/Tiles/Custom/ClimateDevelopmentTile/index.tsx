import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import RadarChart from './RadarChart'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <div className="h-[316px] w-full md:h-[528px]">
        <div className="h-full w-full">
          <RadarChart />
        </div>
      </div>
    </IconTile>
  )
}
