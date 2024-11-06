import { notFound } from 'next/navigation'
import TileCollectionView from '@/components/Views/TileCollectionView'
import TargetFilter from '@/components/Layout/TargetFilter'
import { findPage } from '@/lib/sitemap'
import Container from '@/components/Layout/Container'
import { TargetType } from '@/types/targetMapping'
import { getTerm } from '@/utils/search'
import Title from '@/components/Elements/Title'
import Background from '@/components/Layout/Background'

interface SdgZieleProps {
  params: {
    slug?: string[]
  }
  searchParams: {
    suche?: string
  }
}

export default function SdgZiele({ params, searchParams }: SdgZieleProps) {
  // extract dimension and field from the slug array
  const [slugTarget] = params.slug ?? []

  // find the matching dimension based on the slug
  const target_page = findPage(slugTarget)
  const sdg_target = target_page?.id as TargetType | undefined

  if (slugTarget && !sdg_target) {
    return notFound() // this will trigger the 404 page
  }

  return (
    <>
      <Background light variant="primary">
        <Container className="flex flex-col gap-8 pt-4">
          <div className="mb-4">
            <Title as={'h1'} className="mb-4" font={'normal'} variant="primary">
              Was sind die SDG-Ziele?
            </Title>
            <p>TBD</p>
          </div>
          <TargetFilter sdg_target={sdg_target} />
        </Container>
      </Background>
      <Container>
        <TileCollectionView
          category={'default'}
          sdg_target={sdg_target}
          search_query={getTerm(searchParams)}
        />
      </Container>
    </>
  )
}
