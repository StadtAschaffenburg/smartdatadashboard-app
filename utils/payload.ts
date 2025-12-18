import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import {
  TileVariantLookup,
  TileVariantTypes,
} from '@/utils/variants/TileVariants'
import { ActionDimensionsType } from '@/mapping/dimensionMapping'

export type PayloadDataType = {
  [key: string]: string
}

export function getVariantType(
  payload: TilePayloadType | PayloadDataType,
): TileVariantTypes {
  const action_dimension =
    payload.tags?.action_dimension ?? payload.content?.action_dimension ?? null

  // fetch from lookup table and make sure it's a valid variant
  if (action_dimension && action_dimension in TileVariantLookup) {
    return TileVariantLookup[action_dimension as ActionDimensionsType]
  }

  return 'primary'
}
