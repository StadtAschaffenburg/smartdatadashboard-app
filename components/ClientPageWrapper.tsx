'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import HomeTemplate from '@/components/Templates/HomeTemplate'
import ContentTemplate from '@/components/Templates/ContentTemplate'
import TilesTemplate from '@/components/Templates/TilesTemplate'
import SdgTargetsTemplate from '@/components/Templates/SdgTargetsTemplate'
import SearchTemplate from '@/components/Templates/SearchTemplate'

/**
 * Finds the page_data based on the pathname in the sitemap
 */
export function getCurrentPageClient(
  sitemap: PageMappingType[],
  pathname: string,
): PageMappingType | null {
  // normalize path
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '')

  // search for exact match
  let page = sitemap.find(p => {
    const pageUrl = p.full_url === '/' ? '/' : p.full_url.replace(/\/$/, '')
    return pageUrl === normalizedPath
  })

  // if no exact match, search for slug-based match
  if (!page) {
    const pathSegments = normalizedPath.split('/').filter(Boolean)
    page = sitemap.find(p => {
      const pageSegments = p.full_url.split('/').filter(Boolean)
      return (
        pageSegments.length === pathSegments.length &&
        pageSegments.every(
          (seg: string, idx: number) => seg === pathSegments[idx],
        )
      )
    })
  }

  return page || null
}

interface ClientPageWrapperProps {
  initialPageData: PageMappingType
  sitemap: PageMappingType[]
}

export default function ClientPageWrapper({
  initialPageData,
  sitemap,
}: ClientPageWrapperProps) {
  const pathname = usePathname()
  const [pageData, setPageData] = useState<PageMappingType>(initialPageData)
  const pageDataRef = useRef<PageMappingType>(initialPageData)

  useEffect(() => {
    // if the pathname changes, load the new page_data
    const newPageData = getCurrentPageClient(sitemap, pathname)

    if (newPageData) {
      // check if the page_data has actually changed
      if (newPageData.slug !== pageDataRef.current.slug) {
        pageDataRef.current = newPageData
        setPageData(newPageData)
      }
    }
  }, [pathname, sitemap])

  if (!pageData) {
    return null
  }

  // render the corresponding template based on the page_type
  if (pageData.content.page_type === 'homepage') {
    return <HomeTemplate page_data={pageData} />
  }

  if (pageData.content.page_type === 'default') {
    return <ContentTemplate page_data={pageData} />
  }

  if (pageData.content.page_type === 'tiles') {
    return <TilesTemplate page_data={pageData} sitemap={sitemap} />
  }

  if (pageData.content.page_type === 'search') {
    return <SearchTemplate page_data={pageData} sitemap={sitemap} />
  }

  if (pageData.content.page_type === 'no-filter') {
    return (
      <TilesTemplate
        page_data={pageData}
        show_filter={false}
        sitemap={sitemap}
      />
    )
  }

  if (pageData.content.page_type === 'sdg-targets') {
    return <SdgTargetsTemplate page_data={pageData} sitemap={sitemap} />
  }

  return null
}
