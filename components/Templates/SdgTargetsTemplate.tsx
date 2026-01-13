'use client'

import React, { JSX } from 'react'
import Container from '@/components/Layout/Container'
import {
  findPageByIdOrSlug,
  PageMappingType,
  useTileset,
} from '@schleegleixner/react-statamic-api'
import PageIntro from '@/components/Elements/PageIntro'
import TileCollectionView from '@/components/Views/TileCollectionView'
import TargetFilter from '@/components/Layout/TargetFilter'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import Background from '@/components/Layout/Background'
import FloatingSearchbox from '@/components/Elements/FloatingSearchbox'

export default function SdgTargetsTemplate({
  sitemap,
  page_data,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(page_data?.site_id)

  if (is_loading || has_error || !collection) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  // get parent page here if possible
  const parent_data = findPageByIdOrSlug(sitemap, page_data.parent_id)

  return (
    <>
      <Background light variant="primary">
        <Container className="flex flex-col gap-8">
          <PageIntro
            content={parent_data?.content.content ?? page_data.content.content}
            headline={
              parent_data?.content.headline ?? page_data.content.headline
            }
          />
          <TargetFilter page_data={page_data} sitemap={sitemap} />
        </Container>
      </Background>
      <Container>
        <TileCollectionView
          collection={collection}
          page_data={page_data}
          sitemap={sitemap}
        />
        <FloatingSearchbox />
      </Container>
    </>
  )
}
