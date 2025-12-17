'use client'

import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import React, { JSX } from 'react'
import Grid from '../Layout/Grid'
import {
  PageMappingType,
} from '@schleegleixner/react-statamic-api'
import LinkTile, { LinkTileProps } from '@/components/Elements/LinkTile'

export default function HomeTemplate({
  page_data,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
}): JSX.Element {
  const tiles = page_data.content.tiles || []

  return (
    <Container>
      <div className="flex w-full flex-col gap-8">
        <PageIntro
          content={page_data.content.copy}
          headline={page_data.content.headline}
        />
^
        <Grid columns={3}>
          {tiles.map((tile: LinkTileProps, index: number) => (
            <LinkTile key={index} {...tile} />
          ))}
        </Grid>
      </div>
    </Container>
  )
}
