import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Cookies from '@/components/Layout/Cookies'
import { headers } from 'next/headers'
import { findPage, getPageTitle } from '@/utils/content'
import { getGlobal } from '@/lib/cms'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  icons: '/favicon.ico',
}

async function getPageTitleServer() {
  const current_headers = headers()
  const full_url: string = current_headers.get('x-full-url') ?? ''
  const url = full_url === '/' ? '' : full_url.replace(/^\//, '')
  const segments = url.split('/').filter(Boolean)

  if (segments.length > 2) {
    const last_segment = segments[segments.length - 1]
    const page = findPage(last_segment)
    return getPageTitle(page?.title ?? 'Seite nicht gefunden | 404')
  }

  // is start page
  const start_page = findPage('home')
  return getPageTitle(start_page?.title ?? '')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const global_seo = await getGlobal('seo')
  const page_title = await getPageTitleServer()
  const page_description = global_seo?.meta_description ?? ''

  return (
    <html className={inter.className} lang="de">
      <head>
        <title>{page_title}</title>
        <meta content={page_description} name="description" />

        <meta content={page_title} property="og:title" />
        <meta content={page_description} property="og:description" />
        <meta content="/images/share.png" property="og:image" />
        <meta content="1200" property="og:image:width" />
        <meta content="630" property="og:image:height" />
        <meta content="website" property="og:type" />

        <script
          async
          src="https://cdn.eye-able.com/configs/dashboard.aschaffenburg.de.js"
        ></script>
        <script
          async
          src="https://cdn.eye-able.com/public/js/eyeAble.js"
        ></script>
      </head>
      <body className="overflow-x-hidden">
        {children}
        <Cookies />
      </body>
    </html>
  )
}
