import { TileDataType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'
import CategoryType from '@/types/TilesCategory'

export type TileCollectionProps = {
  collection: TileDataType[]
  category?: CategoryType | null
  action_dimension?: ActionDimensionsType | null
  action_field?: string | null
  sdg_target?: string | null
  search_query?: string | null
}
