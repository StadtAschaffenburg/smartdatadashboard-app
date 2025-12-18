import { TileVariantTypes } from '@/utils/variants/TileVariants'

export type ActionDimensionsType = 'ecology' | 'society' | 'economy'
export type ActionFieldsType =
  | 'arbeit-und-wirtschaft'
  | 'digitalisierung'
  | 'energie'
  | 'globale-verantwortung'
  | 'leben-und-wohnen'
  | 'mobilitaet-und-infrastruktur'
  | 'partizipation-und-teilhabe'
  | 'umwelt-und-ressourcenschutz'
  | 'wetter-und-klima'
  | 'wissenschaft'

export type FieldMappingType = {
  id: ActionFieldsType
  slug: string
}

export type DimensionMappingType = {
  id: ActionDimensionsType
  fields: FieldMappingType[]
  slug: string
}

export type VariantType = ActionDimensionsType | 'live'

export const ActionDimensionColorMap: Record<ActionDimensionsType, TileVariantTypes> = {
  ecology: 'mosque',
  society: 'purple',
  economy: 'orange',
} as const

export type TileVariantsType = DimensionMappingType & 'primary'
