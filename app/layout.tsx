import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Cookies from './Cookies'
import { headers } from 'next/headers'
import { findPage, getPageTitle } from '@/utils/content'
import { getGlobal } from '@/lib/cms'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  icons: '/favicon.ico',
}

// Funktion zum Abrufen des Seitentitels
async function getPageTitleServer() {
  const current_headers = headers()
  const pathname = new URL(current_headers.get('referer') || '/').pathname

  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const segments = url.split('/').filter(Boolean)

  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1]
    const page = findPage(lastSegment)
    return getPageTitle(page?.title ?? '')
  }

  // Fallback für die Startseite
  const startPage = findPage('home')
  return getPageTitle(startPage?.title ?? '')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const global_seo = await getGlobal('seo')
  const page_title = await getPageTitleServer()
  const page_description = global_seo?.description ?? ''

  return (
    <html className={inter.className} lang="de">
      <head>
        <title>{page_title}</title>
        <meta content={page_description} name="description" />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <Cookies />
      </body>
    </html>
  )
}
