import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'


export default async function Home() {
  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <Container>
          <></>
        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 10
