'use client'

import BaseNavbar from './BaseNavbar'
import React, { JSX } from 'react'
import {
  setPageTitle,
  useBreadcrumbs,
} from '@schleegleixner/react-statamic-api'
import { getUriSegment } from '@/utils/uri'
import Breadcrumbs from './Breadcrumbs'

export default function Navbar({
  default_page_title,
  seo_title,
  sitemap,
  site_id,
  tilemap,
}: {
  default_page_title: string
  seo_title: string | null
  sitemap: any[]
  site_id: string
  tilemap: {
    tile_id: string
    title: string | null
  }[]
}): JSX.Element {
  const breadcrumbs = useBreadcrumbs(site_id, sitemap, tilemap)
  const page_title =
    breadcrumbs[breadcrumbs.length - 1].title ?? default_page_title
  setPageTitle(page_title, seo_title)

  return (
    <BaseNavbar
      collapsible={breadcrumbs[0].link !== '/'}
      current_url={getUriSegment() ?? ''}
      page_title={page_title ?? default_page_title}
      site_id={site_id}
      sitemap={sitemap}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </BaseNavbar>
  )
}
