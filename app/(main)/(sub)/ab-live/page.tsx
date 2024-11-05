import TileCollectionView from '@/components/Views/TileCollectionView'
import Container from '@/components/Layout/Container'

export const revalidate = 10

export default function AbLive() {
  return (
    <Container>
      <TileCollectionView category="ab_live" />
    </Container>
  )
}
