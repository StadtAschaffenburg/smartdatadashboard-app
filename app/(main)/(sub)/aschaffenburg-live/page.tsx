import TileCollectionView from '@/components/Views/TileCollectionView'
import Container from '@/components/Layout/Container'
import { getTerm } from '@/utils/search'
import PageIntro from '@/components/Elements/PageIntro'

interface AbLiveProps {
  searchParams: {
    suche?: string
  }
}

export default function AbLive({ searchParams }: AbLiveProps) {
  return (
    <>
      <PageIntro container slug="aschaffenburg-live" />
      <Container>
        <TileCollectionView
          category="ab_live"
          search_query={getTerm(searchParams)}
        />
      </Container>
    </>
  )
}
