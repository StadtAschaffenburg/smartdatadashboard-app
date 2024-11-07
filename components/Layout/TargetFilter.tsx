import React from 'react'
import SdgLink, { SdgLinkProps } from '@/components/Layout/Navbar/SdgLink'
import { TargetType } from '@/types/targetMapping'
import { findPage } from '@/utils/content'

interface TargetFilterProps {
  sdg_target?: TargetType
}

export default async function TargetFilter({ sdg_target }: TargetFilterProps) {
  const parent_page = findPage('sdg_targets')
  const target_pages = parent_page?.children ?? []

  // const current_page = sdg_target ? findPage(sdg_target) : null

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
      {page_links.map((l, index) => (
        <SdgLink key={l.link} {...l} />
      ))}
    </div>
  )
}
