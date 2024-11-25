import TileCollectionView from '@/components/Views/TileCollectionView'
import TargetFilter from '@/components/Layout/TargetFilter'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import Background from '@/components/Layout/Background'
import { getPopulatedCollection } from '@/lib/cms'

export default async function SdgZiele() {
  const collection = await getPopulatedCollection('tiles')

  return (
    <>
      <Background light variant="primary">
        <Container className="flex flex-col gap-8 pt-4">
          <PageIntro slug="nachhaltigkeitsziele" />
          <TargetFilter />
        </Container>
      </Background>
      <Container>
        <TileCollectionView collection={collection} structure={'sdg_target'} />
      </Container>
    </>
  )
}
