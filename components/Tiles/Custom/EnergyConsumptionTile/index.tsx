import {
  TileProps,
} from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import { TileSplitView } from '../../Base/TileSplitView'
import EnergyConsumptionContent from './EnergyConsumptionContent'

export default function Tile({ type, tile_payload }: TileProps) {
  // render component with fetched data
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <div className="mt-4">
            <EnergyConsumptionContent tile_payload={tile_payload} />
          </div>
        </TileSplitView.Left>
      </TileSplitView>
    </IconTile>
  )
}
