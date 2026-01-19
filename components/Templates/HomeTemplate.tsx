'use client'

import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import React, { JSX } from 'react'
import Grid from '../Layout/Grid'
import { ContentImage, PageMappingType } from '@schleegleixner/react-statamic-api'
import LinkTile, { LinkTileProps } from '@/components/Elements/LinkTile'
import Text from '@/components/Elements/Text'
import Title from '@/components/Elements/Title'
import Searchfield from '@/components/Elements/Searchfield'

export default function HomeTemplate({
  page_data,
}: {
  page_data: PageMappingType
}): JSX.Element {
  const tiles = page_data.content.content_tiles || []

  return (
    <>
      <div>
        {page_data.content.hero_image && (
          <div className="relative max-h-[67vh] w-full bg-slate-200 lg:aspect-[16/5] lg:min-h-80">
            <div className="absolute inset-0">
              <ContentImage
                className="absolute object-cover"
                src={page_data.content.hero_image}
              />
            </div>
            <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
              <Container>
                <div className="flex w-fit flex-col items-start gap-4">
                  <div className="rounded w-fit bg-white px-6 py-4 xs:px-8 md:px-12 lg:px-8 lg:py-6 xl:px-12">
                    {page_data.content.hero_topline && (
                      <Text
                        className="mb-2 text-sm uppercase"
                        variant="primary"
                      >
                        {page_data.content.hero_topline}
                      </Text>
                    )}
                    <Title as="h1" margin="none" variant="primary">
                      {page_data.content.hero_headline}
                    </Title>
                  </div>
                  <Searchfield />
                </div>
              </Container>
            </div>
          </div>
        )}
      </div>
      <Container>
        <div className="flex w-full flex-col gap-8">
          <PageIntro
            content={page_data.content.content}
            headline={page_data.content.headline}
            use_columns={true}
          />

          <Grid columns={3}>
            {tiles.map((tile: LinkTileProps, index: number) => (
              <LinkTile key={index} {...tile} />
            ))}
          </Grid>
        </div>
      </Container>
    </>
  )
}
