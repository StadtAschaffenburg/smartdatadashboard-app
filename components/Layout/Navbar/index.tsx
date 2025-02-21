'use client'

import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import Breadcrumbs from './Breadcrumbs'
import React from 'react'
import { useBreadcrumbs } from '@/utils/breadcrumbs'
import { setPageTitle } from '@/utils/content'

export default function Navbar({ page_title }: { page_title: string }) {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const breadcrumbs = useBreadcrumbs()

  // split the URL into segments and filter out empty strings
  const segments = url.split('/').filter(Boolean)
  setPageTitle(breadcrumbs[breadcrumbs.length - 1].title ?? '', page_title)

  return (
    <BaseNavbar collapsible={url !== ''} current_url={segments[0]}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </BaseNavbar>
  )
}
