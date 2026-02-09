'use client'

import React, { JSX } from 'react'
import Container from '@/components/Layout/Container'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import PageIntro from '@/components/Elements/PageIntro'
import TileCollectionView from '@/components/Views/TileCollectionView'
import Searchbox from '@/components/Elements/Searchbox'
import { useTileset } from '@schleegleixner/react-statamic-api'

import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function SearchTemplate({
  page_data,
  sitemap,
}: {
  page_data: PageMappingType
  sitemap: PageMappingType[]
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(page_data.site_id)

  if (is_loading) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  return (
    <>
      <PageIntro
        container
        content={page_data.content.copy}
        headline={page_data.content.headline}
      />
      <Searchbox />
      <Container>
        <TileCollectionView
          collection={collection}
          page_data={page_data}
          sitemap={sitemap}
        />
      </Container>
    </>
  )
}
