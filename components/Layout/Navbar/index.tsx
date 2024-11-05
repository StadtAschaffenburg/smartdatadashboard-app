'use client'

import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import React from 'react'
import { findTitle } from '@/lib/sitemap'

const defaultTitle = 'Smart Data Dashboard'

export default function Navbar() {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const title_arr: string[] = []

  const segments = url.split('/').filter(Boolean)
  segments.forEach((segment, index) => {
    const page_title = findTitle(segment)
    if (page_title) {title_arr.push(page_title)}
  })

  const title = title_arr.length > 0 ? title_arr.join(' - ') : defaultTitle

  return <BaseNavbar title={title} />
}
