import Container from '@/components/Layout/Container'
import { getContent } from '@/lib/cms'
import { PageContentType } from '@/types/PageContent'
import PageIntro from '@/components/Elements/PageIntro'
import LinkTile from '@/components/Elements/LinkTile'
import Columns from '@/components/Layout/Columns'

export const revalidate = false

export default async function Home() {
  const page_content: PageContentType = await getContent('page', 'home')
  const tiles = page_content?.tiles || []

  return (
    <Container>
      <div className="flex w-full flex-col gap-8">
        <PageIntro
          content={page_content?.content}
          headline={page_content?.headline}
        />

        <Columns columns={3}>
          {tiles.map((tile, index) => {
            return <LinkTile key={index} {...tile} />
          })}
        </Columns>
      </div>
    </Container>
  )
}
