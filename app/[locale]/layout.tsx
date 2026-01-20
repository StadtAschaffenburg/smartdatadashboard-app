import '@/styles/globals.css'
import { cookies, headers } from 'next/headers'
import {
  FathomAnalytics,
  getCollection,
  getCurrentPageServer,
  getGlobal,
  isAuthenticated,
  PasswordForm,
  TranslationContext,
} from '@schleegleixner/react-statamic-api'
import { notFound } from 'next/navigation'
import Head from '@/components/Layout/Head'
import CookieConsent from '@/components/Layout/CookieConsent'

const getLangFromSiteId = (locale: string) => {
  const locale_map: Record<string, string> = {
    default: 'de',
    preview: 'de',
  }
  return locale_map[locale] || 'de'
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const current_headers = await headers()
  const cookie_store = await cookies()

  const { locale: site_id } = await params

  if (site_id === '.well-known' || site_id === 'favicon') {
    return notFound()
  }

  // check if password protection is enabled
  if (!isAuthenticated(cookie_store.get('site_auth')?.value ?? '', site_id)) {
    return <PasswordForm lang={getLangFromSiteId(site_id)} />
  }

  const pathname = current_headers.get('x-pathname') || '/'

  // fetch global data
  const global_seo = await getGlobal('seo', site_id)
  const strings = await getGlobal('strings', site_id)
  const sitemap = await getCollection('pages', site_id)
  const page_data = await getCurrentPageServer(sitemap, pathname)

  return (
    <html lang={getLangFromSiteId(site_id)}>
      <Head
        global_seo={global_seo}
        page_data={page_data}
        pathname={pathname}
        site_id={site_id}
      />
      <body className="touch-pan-y overflow-x-hidden text-primary">
        <FathomAnalytics />
        <TranslationContext
          site_id={site_id}
          strings={
            strings && Object.keys(strings).length > 0
              ? strings.entries
              : undefined
          }
        >
          <main id="app-root">{children}</main>
        </TranslationContext>
        <CookieConsent />
      </body>
    </html>
  )
}
