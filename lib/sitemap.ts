export type PageMappingType = {
  id: string
  title: string
  slug: string
  children?: PageMappingType[]
}

export const sitemap: PageMappingType[] = [
  { id: 'home', title: 'Smart Data Dashboard', slug: '' },
  { id: 'ab_live', title: 'Aschaffenburg Live', slug: 'aschaffenburg-live' },
  {
    id: 'dimensions',
    title: 'Handlungsdimensionen',
    slug: 'handlungsdimensionen',
    children: [
      {
        id: 'ecology',
        title: 'Ökologie',
        slug: 'oekologie',
        children: [
          {
            id: 'energie',
            title: 'Energie',
            slug: 'energie',
          },
          {
            id: 'mobilitaet-und-infrastruktur',
            title: 'Mobilität und Infrastruktur',
            slug: 'mobilitaet-und-infrastruktur',
          },
          {
            id: 'umwelt-und-ressourcenschutz',
            title: 'Umwelt und Ressourcenschutz',
            slug: 'umwelt-und-ressourcenschutz',
          },
          {
            id: 'wetter-und-klima',
            title: 'Wetter und Klima',
            slug: 'wetter-und-klima',
          },
        ],
      },
      {
        id: 'society',
        title: 'Soziales',
        slug: 'sozial',
        children: [
          {
            id: 'globale-verantwortung',
            title: 'Globale Verantwortung',
            slug: 'globale-verantwortung',
          },
          {
            id: 'leben-und-wohnen',
            title: 'Leben und Wohnen',
            slug: 'leben-und-wohnen',
          },
          {
            id: 'partizipation-und-teilhabe',
            title: 'Partizipation und Teilhabe',
            slug: 'partizipation-und-teilhabe',
          },
        ],
      },
      {
        id: 'economy',
        title: 'Ökonomie',
        slug: 'oekonomie',
        children: [
          {
            id: 'arbeit-und-wirtschaft',
            title: 'Arbeit und Wirtschaft',
            slug: 'arbeit-und-wirtschaft',
          },
          {
            id: 'digitalisierung',
            title: 'Digitalisierung',
            slug: 'digitalisierung',
          },
          {
            id: 'wissenschaft',
            title: 'Wissenschaft',
            slug: 'wissenschaft',
          },
        ],
      },
    ],
  },
  {
    id: 'sdg_targets',
    title: 'Nachhaltigkeitsziele',
    slug: 'nachhaltigkeitsziele',
    children: [
      {
        id: 'keine-armut',
        title: 'Keine Armut',
        slug: 'keine-armut',
      },
      {
        id: 'kein-hunger',
        title: 'Kein Hunger',
        slug: 'kein-hunger',
      },
      {
        id: 'gesundheit-und-wohlergehen',
        title: 'Gesundheit und Wohlergehen',
        slug: 'gesundheit-und-wohlergehen',
      },
      {
        id: 'hochwertige-bildung',
        title: 'Hochwertige Bildung',
        slug: 'hochwertige-bildung',
      },
      {
        id: 'geschlechtergleichheit',
        title: 'Geschlechtergleichheit',
        slug: 'geschlechtergleichheit',
      },
      {
        id: 'sauberes-wasser-und-sanitaereinrichtungen',
        title: 'Sauberes Wasser und Sanitäreinrichtungen',
        slug: 'sauberes-wasser-und-sanitaereinrichtungen',
      },
      {
        id: 'bezahlbare-und-saubere-energie',
        title: 'Bezahlbare und saubere Energie',
        slug: 'bezahlbare-und-saubere-energie',
      },
      {
        id: 'menschenwuerdige-arbeit-und-wirtschaftswachstum',
        title: 'Menschenwürdige Arbeit und Wirtschaftswachstum',
        slug: 'menschenwuerdige-arbeit-und-wirtschaftswachstum',
      },
      {
        id: 'industrie-innovation-und-infrastruktur',
        title: 'Industrie, Innovation und Infrastruktur',
        slug: 'industrie-innovation-und-infrastruktur',
      },
      {
        id: 'weniger-ungleichheiten',
        title: 'Weniger Ungleichheiten',
        slug: 'weniger-ungleichheiten',
      },
      {
        id: 'nachhaltige-staedte-und-gemeinden',
        title: 'Nachhaltige Städte und Gemeinden',
        slug: 'nachhaltige-staedte-und-gemeinden',
      },
      {
        id: 'nachhaltiger-konsum-und-produktion',
        title: 'Nachhaltiger Konsum und Produktion',
        slug: 'nachhaltiger-konsum-und-produktion',
      },
      {
        id: 'massnahmen-zum-klimaschutz',
        title: 'Maßnahmen zum Klimaschutz',
        slug: 'massnahmen-zum-klimaschutz',
      },
      {
        id: 'leben-unter-wasser',
        title: 'Leben unter Wasser',
        slug: 'leben-unter-wasser',
      },
      {
        id: 'leben-an-land',
        title: 'Leben an Land',
        slug: 'leben-an-land',
      },
      {
        id: 'frieden-gerechtigkeit-und-starke-institutionen',
        title: 'Frieden, Gerechtigkeit und starke Institutionen',
        slug: 'frieden-gerechtigkeit-und-starke-institutionen',
      },
      {
        id: 'partnerschaften-zur-erreichung-der-ziele',
        title: 'Partnerschaften zur Erreichung der Ziele',
        slug: 'partnerschaften-zur-erreichung-der-ziele',
      },
    ],
  },
  { id: 'imprint', title: 'Impressum', slug: 'impressum' },
  { id: 'privacy', title: 'Datenschutzerklärung', slug: 'datenschutz' },
  { id: 'adapt', title: 'Dashboard Adaptieren', slug: 'adaptieren' },
]

export default async function getSitemap(): Promise<PageMappingType[]> {
  // TODO (optional): fetch page titles from CMS
  return sitemap
}
