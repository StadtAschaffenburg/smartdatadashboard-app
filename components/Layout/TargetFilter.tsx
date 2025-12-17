'use client'

import SdgLink, { SdgLinkProps } from '@/components/Layout/Navbar/SdgLink'
import React, { useEffect, useState } from 'react'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Spinner from '@/components/Elements/Spinner'

export default function TargetFilter({
  sitemap,
  current_page_data,
  onChange,
}: {
  sitemap: PageMappingType[]
  current_page_data: PageMappingType
  onChange: (page_slug: string | null) => void
}) {
  const [target_pages, setTargetPages] = useState<PageMappingType[] | null>(
    null,
  )
  const [page_links, setPageLinks] = useState<SdgLinkProps[] | null>(null)

  useEffect(() => {
    // filter the sitemap, only allow pages that have the content.filter.sdg_target set
    const filtered = sitemap.filter(page => page.content.sdg_target)
    setTargetPages(filtered)
  }, [sitemap])

  useEffect(() => {
    if (target_pages) {
      const links = target_pages.map((page, index) => {
        const active = page.slug === current_page_data.slug

        return {
          index: index,
          slug: page.slug,
          link: active ? `${page.parent.full_url}` : `${page.full_url}`,
          title: page.title,
          active: active,
          target: page.content.filter.sdg_target,
        }
      })
      setPageLinks(links)
    }
  }, [target_pages, current_page_data.slug])

  if (!page_links) {
    return <Spinner className="mx-auto" />
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {page_links.map(l => (
        <SdgLink
          key={l.slug}
          {...l}
          onClick={() => onChange(l.active ? null : l.slug)}
        />
      ))}
    </div>
  )
}
