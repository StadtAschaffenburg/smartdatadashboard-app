'use client'

import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import React from 'react'
import { findTitle } from '@/lib/sitemap'

const defaultTitle = 'Smart Data Dashboard'

export default function Navbar() {
  const pathname: string = usePathname() ?? '/'

  const current_slug = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const title = findTitle(current_slug) || defaultTitle

  return <BaseNavbar title={title} />
}
