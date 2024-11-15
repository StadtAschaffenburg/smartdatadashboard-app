import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import { TileSplitView } from '../../Base/TileSplitView'
import EnergyConsumptionContent from './EnergyConsumptionContent'
import getDataSource from '@/lib/api/getDataSource'
import { InputDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  // parallelize data fetching for improved performance
  const [waermeDataInput, stromDataInput] = await Promise.all([
    getDataSource('waerme.csv'),
    getDataSource('strom.csv'),
  ])

  // render component with fetched data
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <div>
            <EnergyConsumptionContent
              stromDataInput={stromDataInput as InputDataType[]}
              waermeDataInput={waermeDataInput as InputDataType[]}
            />
          </div>
        </TileSplitView.Left>
      </TileSplitView>
    </BaseTile>
  )
}
