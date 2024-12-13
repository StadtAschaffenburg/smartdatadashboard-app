import { TilePayloadType } from '@/types/tiles'
import DynamicText from '@/components/Elements/DynamicText'
import Text from '@/components/Elements/Text'
import IconFactory from '@/utils/IconFactory'
import { getVariantType } from '@/utils/payload'

export default function PVAnlagenContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const variant = getVariantType(tile_payload)

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        {tile_payload.icon && (
          <span>
            <IconFactory
              className="h-20 md:h-32"
              type={tile_payload.icon}
              variant={variant}
            />
          </span>
        )}
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
