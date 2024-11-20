import { TilePayloadType } from '@/types/tiles'

export function getDataPoint(
  tile_payload: TilePayloadType,
  key: string,
): number {
  const datapoint =
    tile_payload?.datapoints?.find(datapoint => datapoint.id === key) || null

  if (datapoint) {
    return datapoint.val * 1
  }

  return 0
}

export function getSourceByName(
  tile_payload: TilePayloadType,
  name: string,
): any | null {
  const item = tile_payload.sources.find(entry => entry.name === name)
  return item ? item.content : null
}
