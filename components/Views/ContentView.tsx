'use client'

import React, { JSX, useEffect, useRef, useState } from 'react'
import {
  getPageData,
} from '@schleegleixner/react-statamic-api'
import Spinner from '@/components/Elements/Spinner'
import Container from '@/components/Layout/Container'
import Markdown from '@/components/Elements/Markdown'

interface Props {
  slug: string
}

export default function ContentView({ slug }: Props): JSX.Element {
  const [content, setText] = useState<string | null>(null)
  const isFetching = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) {
        return
      }
      isFetching.current = true
      try {
        const data = await getPageData(slug)
        setText(data?.content)
      } finally {
        isFetching.current = false
      }
    }

    fetchData()
  }, [slug])

  if (content) {
    return (
      <Container>
        <section className="mx-auto max-w-[1136px]">
          <Markdown content={content} />
        </section>
      </Container>
    )
  }

  return (
    <Container>
      <Spinner className="mx-auto" />
    </Container>
  )
}
