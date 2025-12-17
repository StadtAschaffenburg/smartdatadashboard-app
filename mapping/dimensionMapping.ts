import {
  IconArbeitUndWirtschaft,
  IconDigitalisierung,
  IconEnergie,
  IconGlobaleVerantwortung,
  IconLebenUndWohnen,
  IconMobilitaetUndInfrastruktur,
  IconPartizipationUndTeilhabe,
  IconUmweltUndRessourcenschutz,
  IconWetterUndKlima,
  IconWissenschaft,
} from '@/components/Icons/ActionFields'

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
  'arbeit-und-wirtschaft': IconArbeitUndWirtschaft,
  digitalisierung: IconDigitalisierung,
  energie: IconEnergie,
  'globale-verantwortung': IconGlobaleVerantwortung,
  'leben-und-wohnen': IconLebenUndWohnen,
  'mobilitaet-und-infrastruktur': IconMobilitaetUndInfrastruktur,
  'partizipation-und-teilhabe': IconPartizipationUndTeilhabe,
  'umwelt-und-ressourcenschutz': IconUmweltUndRessourcenschutz,
  'wetter-und-klima': IconWetterUndKlima,
  wissenschaft: IconWissenschaft,
}

export type TileVariantsType = DimensionMappingType & 'primary'
