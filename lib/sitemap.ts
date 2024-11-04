export type PageMappingType = {
  id: string
  title: string
  slug: string
  children?: PageMappingType[]
}

export const sitemap: PageMappingType[] = [
  { id: 'home', title: 'Smart Data Dashboard', slug: '' },
  { id: 'ab_live', title: 'Aschaffenburg Live', slug: 'ab-live' },
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

  { id: 'sdg_targets', title: 'SDG-Ziele', slug: 'sdg-ziele' },
  { id: 'imprint', title: 'Impressum', slug: 'impressum' },
  { id: 'privacy', title: 'Datenschutzerklärung', slug: 'datenschutz' },
  { id: 'adapt', title: 'Dashboard Adaptieren', slug: 'adaptieren' },
]

export function findPage(id_or_slug: string): PageMappingType | null {
  const findInchildren = (pages: PageMappingType[]): PageMappingType | null => {
    for (const page of pages) {
      if (page.id === id_or_slug || page.slug === id_or_slug) {
        return page
      }
      if (page.children) {
        const result = findInchildren(page.children)
        if (result) {return result}
      }
    }
    return null
  }

  return findInchildren(sitemap)
}

export function findTitle(id_or_slug: string): string | null {
  const page = findPage(id_or_slug)
  return page ? page.title : null
}

export default sitemap
