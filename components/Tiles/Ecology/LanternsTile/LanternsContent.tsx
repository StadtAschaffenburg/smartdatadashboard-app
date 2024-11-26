import Text from '@/components/Elements/Text'
import DynamicText from '@/components/Elements/DynamicText'
import { IconLanterns } from '@/components/Icons/Ecology'
import { TilePayloadType } from '@/types/tiles'

export default function LanternsContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <IconLanterns className="h-20 fill-ecology md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Text as={'subtitle'}>
            <DynamicText tile_payload={tile_payload}>
              {tile_payload?.legend ?? ''}
            </DynamicText>
          </Text>
        </div>
      </div>
    </div>
  )
}
