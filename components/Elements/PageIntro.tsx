import Title from '@/components/Elements/Title'
import Markdown from '@/components/Elements/Markdown'
import { cx } from 'class-variance-authority'
import Container from '@/components/Layout/Container'

export default function PageIntro({
  headline,
  content,
  container,
  use_columns = false,
}: {
  headline?: string | null
  content?: string | null
  slug?: string
  container?: boolean
  use_columns?: boolean
}) {
  if (!headline && !content) {
    return <></>
  }

  const ContentNode = (
    <>
      <div className="my-4">
        {headline && (
          <Title as="h1" className="mb-8" variant="primary">
            {headline}
          </Title>
        )}

        {content && (
          <div className={cx('gap-16', use_columns ? 'lg:columns-2' : '')}>
            <Markdown content={content} />
          </div>
        )}
      </div>
    </>
  )

  return container ? <Container>{ContentNode}</Container> : ContentNode
}
