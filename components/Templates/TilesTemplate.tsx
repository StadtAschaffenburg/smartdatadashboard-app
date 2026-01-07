'use client'

import React, { JSX } from 'react'
import Container from '@/components/Layout/Container'
import { PageMappingType, useTileset } from '@schleegleixner/react-statamic-api'
import PageIntro from '@/components/Elements/PageIntro'
import TileCollectionView from '@/components/Views/TileCollectionView'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import DimensionFilter from '@/components/Layout/DimensionFilter/index'

export default function TilesTemplate({
  sitemap,
  page_data,
  show_filter = true,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
  show_filter?: boolean
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(page_data?.site_id)

  if (is_loading || has_error || !collection) {
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
        content={page_data.content.content}
        headline={page_data.content.headline}
      />

      {show_filter && <DimensionFilter page_data={page_data} sitemap={sitemap} />}

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
