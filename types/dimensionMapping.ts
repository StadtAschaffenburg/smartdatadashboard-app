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

// Defining the dimension mapping
const dimensionMapping: DimensionMappingType[] = [
  {
    id: 'ecology',
    fields: [
      {
        id: 'energie',
        slug: 'energie',
      },
      {
        id: 'mobilitaet-und-infrastruktur',
        slug: 'mobilitaet-und-infrastruktur',
      },
      {
        id: 'umwelt-und-ressourcenschutz',
        slug: 'umwelt-und-ressourcenschutz',
      },
      {
        id: 'wetter-und-klima',
        slug: 'wetter-und-klima',
      },
    ],
    slug: 'oekologie',
  },
  {
    id: 'society',
    fields: [
      {
        id: 'globale-verantwortung',
        slug: 'globale-verantwortung',
      },
      {
        id: 'leben-und-wohnen',
        slug: 'leben-und-wohnen',
      },
      {
        id: 'partizipation-und-teilhabe',
        slug: 'partizipation-und-teilhabe',
      },
    ],
    slug: 'sozial',
  },
  {
    id: 'economy',
    fields: [
      {
        id: 'arbeit-und-wirtschaft',
        slug: 'arbeit-und-wirtschaft',
      },
      {
        id: 'digitalisierung',
        slug: 'digitalisierung',
      },
      {
        id: 'wissenschaft',
        slug: 'wissenschaft',
      },
    ],
    slug: 'oekonomie',
  },
]

export default dimensionMapping
