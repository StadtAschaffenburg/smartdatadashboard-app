import TileCollectionView from '@/components/Views/TileCollectionView'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import { getPopulatedCollection } from '@/lib/cms'

export default async function AbLive() {
  const collection = await getPopulatedCollection('tiles')

  return (
    <>
      <PageIntro container slug="aschaffenburg-live" />
      <Container>
        <TileCollectionView category={'ab_live'} collection={collection} />
      </Container>
    </>
  )
}
