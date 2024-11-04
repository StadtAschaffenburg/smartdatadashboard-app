import { TileDataType } from '@/types/tiles'

export type TileCollectionProps = {
  collection: TileDataType[]
  type?: 'default' | 'ab_live' | null
  category?: 'default' | 'full' | null
  action_dimension?: 'ecology' | 'society' | 'economy' | null
  action_field?: string | null
  sdg_target?: string | null
  search_query?: string | null
}
