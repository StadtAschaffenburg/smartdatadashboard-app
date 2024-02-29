import AnimatedPage from '@/components/Layout/AnimatedPage'
import Container from '@/components/Layout/Container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <AnimatedPage>{children}</AnimatedPage>
    </Container>
  )
}
