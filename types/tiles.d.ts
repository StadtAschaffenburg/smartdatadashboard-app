export type TileTypePrefix = 'ecology' | 'society' | 'economy'

export type TileType = `${TileTypePrefix}-${string}`

export type TileDataType = {
  tile_id: TileIdType
  title: string
  layout: 'default' | 'full'
  tags: {
    category: 'default' | 'ab_live'
    action_dimension: string
    action_field: string
    sdg_target: string
  }
  search: string
}
