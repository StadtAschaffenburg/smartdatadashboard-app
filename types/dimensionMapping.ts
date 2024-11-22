import { IconPlaceholder } from '@/components/Icons/ActionFields'

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

export const ActionFieldsIconMap = {
  'arbeit-und-wirtschaft': IconPlaceholder,
  digitalisierung: IconPlaceholder,
  energie: IconPlaceholder,
  'globale-verantwortung': IconPlaceholder,
  'leben-und-wohnen': IconPlaceholder,
  'mobilitaet-und-infrastruktur': IconPlaceholder,
  'partizipation-und-teilhabe': IconPlaceholder,
  'umwelt-und-ressourcenschutz': IconPlaceholder,
  'wetter-und-klima': IconPlaceholder,
  wissenschaft: IconPlaceholder,
}

export type TileVariantsType = DimensionMappingType & 'primary'
