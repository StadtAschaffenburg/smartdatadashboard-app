import Spinner from '@/components/Elements/Spinner'
import Container from '@/components/Layout/Container'

export default function Loading() {
  return (
    <Container>
      <Spinner className="mx-auto" />
    </Container>
  )
}
