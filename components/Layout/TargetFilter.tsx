'use client'

import SdgLink, { SdgLinkProps } from '@/components/Layout/Navbar/SdgLink'
import React, { useEffect, useState } from 'react'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Spinner from '@/components/Elements/Spinner'
import { scrollToElement } from '@/utils/scroll'
import { useRouter } from 'next/navigation'

export default function TargetFilter({
  page_data,
  sitemap,
}: {
  page_data: PageMappingType
  sitemap: PageMappingType[]
}) {
  const router = useRouter()
  const [targetPages, setTargetPages] = useState<PageMappingType[] | null>(null)

  useEffect(() => {
    // filter the sitemap, only allow pages that have the content.filter.sdg_target set
    const filtered = sitemap.filter(page => page.content.sdg_target)
    setTargetPages(filtered)
  }, [sitemap])

  useEffect(() => {
    if (!sitemap) {
      return
    }

    const dimensionPages = sitemap.filter(
      (page: any) => page.content.sdg_target,
    )
    setTargetPages(dimensionPages)
  }, [sitemap])

  if (!targetPages) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const onClick = (page: PageMappingType, event: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('=== onClick ===')
    event.preventDefault()
    const targetUrl = page.slug === page_data.slug && page.parent
      ? page.parent.full_url
      : page.full_url
    router.push(targetUrl)
    
    setTimeout(() => {
      scrollToElement('tile-collection', -100)
    }, 500)
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {targetPages.map(page => {
        const isActive = page.slug === page_data.slug
        return (
          <SdgLink
            active={isActive}
            key={page.slug}
            link={
              isActive && page.parent
                ? page.parent.full_url
                : page.full_url
            }
            onClick={(event) => onClick(page, event)}
            preventDefault={true}
            target={page.content.sdg_target}
            {...page}
          />
        )
      })}
    </div>
  )
}
