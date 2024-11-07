import Title from '@/components/Elements/Title'
import { getContent } from '@/lib/cms'
import { PageContentType } from '@/types/PageContent'
import Markdown from '@/components/Elements/Markdown'
import Container from '@/components/Layout/Container'

export default async function PageIntro({
  headline,
  content,
  slug,
  container,
}: {
  headline?: string | null
  content?: string | null
  slug?: string
  container?: boolean
}) {
  const page_content: PageContentType = slug
    ? await getContent('page', slug)
    : {}
  headline = page_content?.headline ?? headline
  content = page_content?.content ?? content

  if (!headline && !content) {
    return <></>
  }

  const ContentNode = (
    <>
      <div className="my-4">
        {headline && (
          <Title as="h1" className="mb-8" font="normal" variant="primary">
            {headline}
          </Title>
        )}

        {content && (
          <div className="gap-16 lg:columns-2">
            <Markdown content={content} />
          </div>
        )}
      </div>
    </>
  )

  return container ? <Container>{ContentNode}</Container> : ContentNode
}
