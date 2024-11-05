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
