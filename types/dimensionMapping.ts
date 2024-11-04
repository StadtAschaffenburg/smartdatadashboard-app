export const rootPage = 'daten'

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
