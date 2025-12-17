import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import Text from '@/components/Elements/Text'
import IconFactory from '@/utils/factories/IconFactory'
import { getVariantType } from '@/utils/payload'

export default function IconTextContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const variant = getVariantType(tile_payload)
  const highlight_text = tile_payload?.highlight_text
  const legend_text = tile_payload?.legend

  return (
    <div className="mb-4 flex flex-row gap-6">
      {tile_payload.icon && (
        <div className="">
          <IconFactory
            className="mt-2 w-12 md:w-20 lg:w-32"
            type={tile_payload.icon}
            variant={tile_payload.icon_variant || variant}
          />
        </div>
      )}
      <div className="flex flex-grow flex-col justify-center gap-2">
        {highlight_text && (
          <Text as="h1" markdown variant={tile_payload.icon_variant || variant}>
            {highlight_text}
          </Text>
        )}
        {legend_text && (
          <Text as="md" markdown>
            {legend_text}
          </Text>
        )}
      </div>
    </div>
  )
}
