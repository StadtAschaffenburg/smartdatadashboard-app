import AnimatedPage from '@/components/Layout/AnimatedPage'
import Container from '@/components/Layout/Container'
import Footer from '@/components/Layout/Footer'
import CollectionNavbar from '@/components/Layout/Navbar/CollectionNavbar'
import Providers from '@/components/Layout/Providers'
import { notFound } from 'next/navigation'
import getContent from '@/utils/ContentFactory'

// revalidate each minute
export const revalidate = 10

const getCollection = async (collectionSlug: string) => {
  const { data } = await getContent(collectionSlug, 'collections', {
    filter: {
      slug: collectionSlug,
    }
  })

  return data?.[0]
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { slug: string }
}) {
  if (!params) {
    return notFound()
  }

  const { slug } = params

  if (!slug) {
    return notFound()
  }

  const collection = await getCollection(slug)

  if (!collection) {
    return notFound()
  }

  const { title, description } = collection[0] ?? collection

  return (
    <div className="flex h-screen flex-col">
      <CollectionNavbar description={description || ''} title={title} />
      <Container className="flex-1">
        <Providers>
          <AnimatedPage>{children}</AnimatedPage>
        </Providers>
      </Container>
      <Footer />
    </div>
  )
}
