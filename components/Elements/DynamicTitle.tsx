import DynamicText from '@/components/Elements/DynamicText'
import { TilePayloadType } from '@/types/tiles'

export default function DynamicTitle({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  return (
    <>
      <DynamicText tile_payload={tile_payload}>
        {tile_payload.title ?? ''}
      </DynamicText>
    </>
  )
}
