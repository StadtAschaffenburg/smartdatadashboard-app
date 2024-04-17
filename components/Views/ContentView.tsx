'use client'

import Title from '@/components/Elements/Title'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import getPageData from '@/lib/api/getPageData'

interface Props {
  slug: string
}

export default function Impressum({ slug }: Props): JSX.Element {
  const [content, setText] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await getPageData(slug)
      setText(data?.content)
    })()
  }, [])

  if (content) {
    return (
      <main className="mx-auto max-w-[1136px]">
        <ReactMarkdown
          components={{
            h1: props => (
              <Title
                as={'h2'}
                className="mb-2"
                variant={'primary'}
                {...props}
              />
            ),
            h2: props => (
              <Title
                as={'h3'}
                className="mb-2"
                variant={'primary'}
                {...props}
              />
            ),
            h3: props => (
              <Title
                as={'h4'}
                className="mb-2"
                variant={'primary'}
                {...props}
              />
            ),
            h4: props => (
              <Title
                as={'h5'}
                className="mb-2"
                variant={'primary'}
                {...props}
              />
            ),
            h5: props => (
              <Title
                as={'h6'}
                className="mb-2"
                variant={'primary'}
                {...props}
              />
            ),
            h6: props => <Title as={'h7'} className="mb-2" {...props} />,
            ul: props => <ul className="list-disc px-6" {...props} />,
            p: props => (
              <Title as="h5" className="mb-4" font={'normal'} {...props} />
            ),
            a: props => <a className="underline" {...props} />,
          }}
          linkTarget={'_blank'}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </main>
    )
  }

  return <p>Lade...</p>
}
