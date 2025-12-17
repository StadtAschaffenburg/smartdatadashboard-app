import { notFound } from 'next/navigation'

import HomeTemplate from '@/components/Templates/HomeTemplate'
import ContentTemplate from '@/components/Templates/ContentTemplate'
import TilesTemplate from '@/components/Templates/TilesTemplate'
import SdgTargetsTemplate from '@/components/Templates/SdgTargetsTemplate'
import { getCurrentPageServer } from '@schleegleixner/react-statamic-api'
import { headers } from 'next/headers'

import { getCollection } from '@schleegleixner/react-statamic-api'

export default async function Page({ params }: any) {
  // only real pages are handled here, no mounted slugs (tiles/taxonomies)
  const { 'locale': site_id } = await params

  if (site_id === '.well-known') {
    notFound()
  }

  const current_headers = await headers()
  const pathname = current_headers.get('x-pathname') || '/'

  const sitemap = await getCollection('pages', site_id)
  const page_data = await getCurrentPageServer(sitemap, pathname, true)

  if (!page_data) {
    notFound()
  }

  if (page_data.content.page_type === 'homepage') {
    return <HomeTemplate page_data={page_data} sitemap={sitemap} />
  }

  if (page_data.content.page_type === 'default') {
    return <ContentTemplate page_data={page_data} />
  }

  if (page_data.content.page_type === 'tiles') {
    return <TilesTemplate page_data={page_data} sitemap={sitemap} />
  }

  if (page_data.content.page_type === 'sdg-targets') {
    return <SdgTargetsTemplate page_data={page_data} sitemap={sitemap} />
  }

  notFound()
}
