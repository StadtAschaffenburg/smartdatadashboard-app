import { TilePayloadType } from '@/types/tiles'

export function getDataPoint(
  tile_payload: TilePayloadType,
  key: string,
  fallback: number = 0,
): number {
  const datapoint =
    tile_payload.datapoints?.find(datapoint => datapoint.id === key) || null

  if (datapoint) {
    return datapoint.val
  }

  return fallback
}

export function getString(
  tile_payload: TilePayloadType,
  key: string,
  fallback: string = '',
): string {
  const string = tile_payload.strings?.find(string => string.id === key) || null

  if (string) {
    return string.val
  }

  return fallback
}

export function getAllStrings(tile_payload: TilePayloadType): {
  [key: string]: string
} {
  return (
    tile_payload.strings?.reduce((result: { [key: string]: string }, item) => {
      if (item.id && item.val) {
        result[item.id] = item.val
      }
      return result
    }, {}) || {}
  )
}

export type TileVariantTypes = 'primary' | 'ecology' | 'economy' | 'society'

export function getVariantType(
  tile_payload: TilePayloadType,
): TileVariantTypes {
  // if category "ab_live" is set, use live tile variant, else use action_dimension
  if (tile_payload?.tags?.category === 'ab_live') {
    return 'primary'
  } else if (tile_payload?.tags?.action_dimension) {
    return tile_payload.tags.action_dimension
  }
  return 'primary'
}

export function getAllSources(
  tile_payload: TilePayloadType,
  get_first: boolean = false,
): any | null {
  const sources = tile_payload.sources

  if (get_first) {
    return sources.length > 0 ? sources[0].content : null
  } 
    return sources
  
}

export function getSourceByName(
  tile_payload: TilePayloadType,
  name: string,
  fallback: any = null,
): any | null {
  const item = tile_payload.sources.find(entry => entry.name === name)
  return item ? item.content : fallback
}
