'use client'

import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import Breadcrumbs, { BreadcrumbType } from './Breadcrumbs'
import React from 'react'
import { findTitle, getPermalink } from '@/utils/content'
import { PageMappingType } from '@/lib/sitemap'

const defaultTitle = 'Smart Data Dashboard'

export default function Navbar({ sitemap }: { sitemap: PageMappingType[] }) {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  let breadcrumbs: BreadcrumbType[] = []

  // split the URL into segments and filter out empty strings
  const segments = url.split('/').filter(Boolean)
  segments.forEach(segment => {
    const page_title = findTitle(segment, sitemap)
    const permalink = getPermalink(segment, sitemap)
    const breadcrumb: BreadcrumbType = {
      title: page_title,
      link: permalink,
    }
    breadcrumbs.push(breadcrumb)
  })

  if (breadcrumbs.length === 0) {
    breadcrumbs = [
      {
        title: defaultTitle,
        link: '/',
      },
    ]
  }

  return (
    <BaseNavbar current_url={segments[0]}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </BaseNavbar>
  )
}
