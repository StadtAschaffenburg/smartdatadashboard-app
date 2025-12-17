import { getSource, InputDataType, TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import { TileSplitView } from '../../Base/TileSplitView'
import EnergyConsumptionContent from './EnergyConsumptionContent'

export default function Tile({ type, tile_payload }: TileProps) {
  const waermeDataInput: InputDataType[] = getSource(
    tile_payload,
    'waerme.csv',
  )
  const stromDataInput: InputDataType[] = getSource(
    tile_payload,
    'strom.csv',
  )

  // render component with fetched data
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <div className="mt-4">
            <EnergyConsumptionContent
              stromDataInput={stromDataInput}
              tile_payload={tile_payload}
              waermeDataInput={waermeDataInput}
            />
          </div>
        </TileSplitView.Left>
      </TileSplitView>
    </IconTile>
  )
}
