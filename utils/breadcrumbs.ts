import { usePathname } from 'next/navigation'
import { sitemap as sitemap_static } from '@/lib/sitemap'
import { findPage, findTitle, getPermalink } from '@/utils/content'

export type BreadcrumbType = {
  title: string | null
  link?: string | null
}

// Custom Hook für Breadcrumbs
export function useBreadcrumbs(): BreadcrumbType[] {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  let breadcrumbs: BreadcrumbType[] = []

  const segments = url.split('/').filter(Boolean)
  segments.forEach(segment => {
    const page_title = findTitle(segment, sitemap_static)
    const permalink = getPermalink(segment, sitemap_static)
    const breadcrumb: BreadcrumbType = {
      title: page_title,
      link: permalink,
    }
    breadcrumbs.push(breadcrumb)
  })

  if (breadcrumbs.length === 0) {
    const start_page = findPage('home', sitemap_static)
    if (start_page) {
      breadcrumbs = [
        {
          title: start_page.title,
          link: '/',
        },
      ]
    }
  }

  return breadcrumbs
}
