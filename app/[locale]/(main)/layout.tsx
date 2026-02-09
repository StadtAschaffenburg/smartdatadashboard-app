import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Providers from '@/components/Layout/Providers'
import Top from '@/components/Layout/Top'
import { getCollection, getGlobal } from '@schleegleixner/react-statamic-api'
import { headers } from 'next/headers'

export const revalidate = false

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const current_headers = await headers()
  const site_id = current_headers.get('x-site-id') || 'default'

  const sitemap = await getCollection('pages', site_id)
  const tiles = await getCollection('tiles', site_id)
  const global_seo = await getGlobal('seo', site_id)
  const page_title = global_seo?.page_title ?? ''

  const tilemap = tiles.map((tile: any) => ({
    tile_id: tile.tile_id,
    title: tile.content?.title ?? null,
  }))

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Top site_id={site_id} sitemap={sitemap} />
      <Navbar
        default_page_title={page_title}
        seo_title={global_seo.page_title}
        site_id={site_id}
        sitemap={sitemap}
        tilemap={tilemap}
      />
      <div className="min-h-[100vh] flex-1" id="content">
        <Providers>{children}</Providers>
      </div>
      <Footer sitemap={sitemap} />
    </div>
  )
}
