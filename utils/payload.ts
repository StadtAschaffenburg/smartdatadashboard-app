import { TilePayloadType } from '@/types/tiles'

export type PayloadDataType = {
  [key: string]: string
}

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

export function getAllStrings(tile_payload: TilePayloadType): PayloadDataType {
  return (
    tile_payload.strings?.reduce((result: PayloadDataType, item) => {
      if (item.id && item.val) {
        result[item.id] = item.val
      }
      return result
    }, {}) || {}
  )
}

export type TileVariantTypes = 'ecology' | 'economy' | 'society'

export function getVariantType(
  tile_payload: TilePayloadType,
): TileVariantTypes {
  return tile_payload.tags.action_dimension
}

export function getAllSources(
  tile_payload: TilePayloadType,
  get_first: boolean = false,
): any | null {
  const sources = tile_payload.sources

  if (get_first && sources && sources.length > 0) {
    return sources[0].content
  }
  return sources
}

export function getSourceByName(
  tile_payload: TilePayloadType,
  file_name: string,
  fallback: any = null,
): any | null {
  const item = tile_payload?.sources?.find(
    entry => entry.file_name === file_name,
  )
  return item ? item.content : fallback
}

export function filterValidEntries(
  data: PayloadDataType[],
  needs_valid_data: boolean = false,
): PayloadDataType[] {
  if (!data.length) {return []}

  const firstColumnKey = Object.keys(data[0])[0]

  return data.filter(entry => {
    const isFirstColumnValid =
      entry[firstColumnKey] && entry[firstColumnKey].trim() !== ''

    const hasValidData = Object.entries(entry).some(([key, value]) => {
      return key !== firstColumnKey && value.trim() !== ''
    })

    return isFirstColumnValid && (hasValidData || needs_valid_data)
  })
}
