import { PageMappingType, sitemap as sitemap_static } from '@/lib/sitemap'

export function getPermalink(
  id_or_slug: string,
  node: PageMappingType[],
  parent_path = '',
): string | null {
  for (const page of node) {
    const current_path = `${parent_path}/${page.slug}`.replace(/\/+$/, '')

    if (page.id === id_or_slug || page.slug === id_or_slug) {
      return current_path || '/'
    }

    if (page.children) {
      const child_path = getPermalink(id_or_slug, page.children, current_path)
      if (child_path) {
        return child_path
      }
    }
  }

  return null
}

export function findPage(
  id_or_slug: string,
  sitemap?: PageMappingType[],
): PageMappingType | null {
  if (!sitemap) {
    sitemap = sitemap_static
  }

  const findInchildren = (pages: PageMappingType[]): PageMappingType | null => {
    for (const page of pages) {
      if (page.id === id_or_slug || page.slug === id_or_slug) {
        return page
      }
      if (page.children) {
        const result = findInchildren(page.children)
        if (result) {
          return result
        }
      }
    }
    return null
  }

  return findInchildren(sitemap)
}

export function findTitle(slug: string, sitemap: PageMappingType[]): string {
  if (!sitemap) {
    sitemap = sitemap_static
  }

  const page = findPage(slug, sitemap)
  return page ? page.title : ''
}
