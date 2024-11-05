export type TargetType =
  | 'keine-armut'
  | 'kein-hunger'
  | 'gesundheit-und-wohlergehen'
  | 'hochwertige-bildung'
  | 'geschlechtergleichheit'
  | 'sauberes-wasser-und-sanitaereinrichtungen'
  | 'bezahlbare-und-saubere-energie'
  | 'menschenwuerdige-arbeit-und-wirtschaftswachstum'
  | 'industrie-innovation-und-infrastruktur'
  | 'weniger-ungleichheiten'
  | 'nachhaltige-staedte-und-gemeinden'
  | 'nachhaltiger-konsum-und-produktion'
  | 'massnahmen-zum-klimaschutz'
  | 'leben-unter-wasser'
  | 'frieden-gerechtigkeit-und-starke-institutionen'
  | 'leben-an-land'
  | 'partnerschaften-zur-erreichung-der-ziele'

export type TargetMappingType = {
  id: TargetType
  slug: string
}
