import { TileDataType } from '@schleegleixner/react-statamic-api'
import { ActionDimensionsType } from '@/mapping/dimensionMapping'
import CategoryType from '@/types/CategoryType'

export type TileCollectionProps = {
  collection: TileDataType[]
  category?: CategoryType | null
  action_dimension?: ActionDimensionsType | null
  action_field?: string | null
  sdg_target?: string | null
  search_query?: string | null
}
