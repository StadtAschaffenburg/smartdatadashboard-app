import { notFound } from 'next/navigation'

import { getCurrentPageServer } from '@schleegleixner/react-statamic-api'
import { headers } from 'next/headers'
import { getCollection } from '@schleegleixner/react-statamic-api'
import ClientPageWrapper from '@/components/ClientPageWrapper'

export default async function Page({ params }: any) {
  // only real pages are handled here, no mounted slugs (tiles/taxonomies)
  const { 'locale': site_id } = await params

  if (site_id === '.well-known' || site_id === 'favicon') {
    notFound()
  }

  const current_headers = await headers()
  const pathname = current_headers.get('x-pathname') || '/'

  const sitemap = await getCollection('pages', site_id)
  const page_data = await getCurrentPageServer(sitemap, pathname, true)

  if (!page_data) {
    notFound()
  }

  console.log('=== SERVER RENDERING ===')

  // Verwende den clientseitigen Wrapper für clientseitiges Routing
  return <ClientPageWrapper initialPageData={page_data} sitemap={sitemap} />
}
