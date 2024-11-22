'use client'

import SdgLink, { SdgLinkProps } from '@/components/Layout/Navbar/SdgLink'
import { TargetType } from '@/types/targetMapping'
import { findPage } from '@/utils/content'
import React, { useEffect, useState } from 'react'
import { scrollToElement } from '@/utils/scroll'

export default function TargetFilter() {
  const [sdg_target, setSdgTarget] = useState<string | null>(null)

  useEffect(() => {
    const path_segments = window.location.pathname.split('/').filter(Boolean)
    if (path_segments[1]) {
      setSdgTarget(path_segments[1])
    }
  }, [])

  const parent_page = findPage('sdg_targets')
  const target_pages = parent_page?.children ?? []

  const navigateTo = (sdg_target: string) => {
    const new_url = `/nachhaltigkeitsziele/${sdg_target}`
    setSdgTarget(sdg_target)
    window.history.pushState(null, '', new_url)
    if (sdg_target) {
      scrollToElement('tile-collection', -100)
    }
  }

  // get the links
  const page_links: SdgLinkProps[] = target_pages.map((page, index) => {
    const page_id = page.id as TargetType
    const active = page_id === sdg_target

    return {
      index: index,
      link: `/${parent_page?.slug}/${!active ? page.slug : ''}`,
      title: page.title,
      active: active,
    }
  })

  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {page_links.map(l => (
        <SdgLink
          key={l.link}
          {...l}
          onClick={() => navigateTo(l.link.split('/').pop()!)}
        />
      ))}
    </div>
  )
}
