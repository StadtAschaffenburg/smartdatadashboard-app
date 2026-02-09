'use client'

import React, { JSX } from 'react'
import Spinner from '@/components/Elements/Spinner'
import Container from '@/components/Layout/Container'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Markdown from '@/components/Elements/Markdown'

export default function ContentTemplate({
  page_data,
}: {
  page_data: PageMappingType
}): JSX.Element {
  if (!page_data) {
    return (
      <Container>
        <Spinner className="mx-auto" />
      </Container>
    )
  }

  return (
    <Container>
      <section className="mx-auto max-w-[1136px]">
        <Markdown content={page_data.content.content} />
      </section>
    </Container>
  )
}
