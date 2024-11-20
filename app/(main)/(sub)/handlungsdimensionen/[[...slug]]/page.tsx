import TileCollectionView from '@/components/Views/TileCollectionView'
import DimensionFilter from '@/components/Layout/DimensionFilter'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import { getPopulatedCollection } from '@/lib/cms'

export default async function Handlungsdimensionen() {
  const collection = await getPopulatedCollection('tiles')

  return (
    <>
      <PageIntro container slug="handlungdimensionen" />
      <DimensionFilter />
      <Container>
        <TileCollectionView
          category={'default'}
          collection={collection}
          structure={'action_dimension/action_field'}
        />
      </Container>
    </>
  )
}
