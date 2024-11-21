import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Providers from '@/components/Layout/Providers'
import Top from '@/components/Layout/Top'
import getSitemap from '@/lib/sitemap'

export const revalidate = false

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sitemap = await getSitemap()

  return (
    <div className="flex min-h-screen flex-col ">
      <Top />
      <Navbar sitemap={sitemap} />
      <div className="flex-1" id="content">
        <Providers>{children}</Providers>
      </div>
      <Footer />
    </div>
  )
}
