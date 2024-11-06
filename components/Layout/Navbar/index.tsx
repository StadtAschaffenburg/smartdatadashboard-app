'use client'

import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import Breadcrumbs, { BreadcrumbType } from './Breadcrumbs'
import React from 'react'
import { findTitle, getPermalink } from '@/lib/sitemap'

const defaultTitle = 'Smart Data Dashboard'

export default function Navbar() {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  let breadcrumbs: BreadcrumbType[] = []

  const segments = url.split('/').filter(Boolean)
  segments.forEach(segment => {
    const page_title = findTitle(segment)
    const permalink = getPermalink(segment)
    const breadcrumb: BreadcrumbType = {
      title: page_title ?? segment,
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
    <BaseNavbar>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </BaseNavbar>
  )
}
