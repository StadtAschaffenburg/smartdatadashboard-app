import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import { TileSplitView } from '../../Base/TileSplitView'
import Title from '@/components/Elements/Title'
import EnergyConsumptionContent from './EnergyConsumptionContent'
import getSourceData from '@/lib/api/getSourceData'
import { InputDataType } from './dt'

export default async function Tile({ type, tile_payload }: TileProps) {
  // parallelize data fetching for improved performance
  const [waermeDataInput, stromDataInput] = await Promise.all([
    getSourceData('waerme.csv'),
    getSourceData('strom.csv'),
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
        <TileSplitView.Right>
          <Title as="h5" variant="dark">
            {tile_payload?.copy ?? ''}
          </Title>
        </TileSplitView.Right>
      </TileSplitView>
    </BaseTile>
  )
}
