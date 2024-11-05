import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import BicycleChartContent from './BicycleChartContent'

export default async function BicycleChartTile({
  type,
  tile_payload,
}: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <>
        <BicycleChartContent />
        <Spacer size={'lg'} />
        <Title as="h5">{tile_payload?.copy ?? ''}</Title>
      </>
    </BaseTile>
  )
}
