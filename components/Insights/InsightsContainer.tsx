import withSuspense from '@/utils/withSuspense'
import Container from '../Layout/Container'

async function InsightsContainer() {
  return (
    <div className="w-full">
      <Container className="sm:px-0 px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0"></Container>
    </div>
  )
}

const Fallback = (
  <div className="w-full">
    <Container>
      <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="h-96 w-full flex-1 animate-pulse self-stretch bg-zinc-100 md:rounded-[56px]" />
        <div className="h-96 w-full flex-1 animate-pulse self-stretch bg-zinc-100 md:rounded-[56px]" />
        <div className="h-96 w-full flex-1 animate-pulse self-stretch bg-zinc-100 md:rounded-[56px]" />
      </div>
    </Container>
  </div>
)

export default withSuspense(InsightsContainer, Fallback)
