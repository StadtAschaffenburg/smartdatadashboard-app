import React from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, {
  LinkProps,
} from '@/components/Layout/Navbar/LinkComponent'
import { TargetType } from '@/types/targetMapping'
import { findPage } from '@/lib/sitemap'

interface TargetFilterProps {
  sdg_target?: TargetType
}

export default async function TargetFilter({ sdg_target }: TargetFilterProps) {
  const parent_page = findPage('sdg_targets')
  const target_pages = parent_page?.children ?? []

  // const current_page = sdg_target ? findPage(sdg_target) : null

  // get the links
  const page_links: LinkProps[] = target_pages.map(page => {
    const page_id = page.id as TargetType
    const active = page_id === sdg_target

    return {
      link: `/${parent_page?.slug}/${!active ? page.slug : ''}`,
      title: page.title,
      active: active,
    }
  })

  const default_variant = 'primary'

  return (
    <Background light variant={default_variant}>
      <Container>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          {page_links.map(l => (
            <LinkComponent key={l.link} variant="primary" {...l} />
          ))}
        </div>
      </Container>
    </Background>
  )
}
