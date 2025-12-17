import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import {
  TileVariantLookup,
  TileVariantTypes,
} from '@/utils/variants/TileVariants'

export type PayloadDataType = {
  [key: string]: string
}

export function getVariantType(
  payload: TilePayloadType | PayloadDataType,
): TileVariantTypes {
  const action_field = payload.tags?.action_field ?? payload.content?.action_field ?? null

  // fetch from lookup table and make sure it's a valid variant
  if (action_field && TileVariantLookup[action_field]) {
    return TileVariantLookup[action_field] as TileVariantTypes
  }

  return 'primary'
}
