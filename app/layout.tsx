import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Cookies from './Cookies'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Smart Data Dashboard Aschaffenburg',
  description: 'Das Smart Data Dashboard der Stadt Aschaffenburg',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="de">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {children}
        <Cookies />
      </body>
    </html>
  )
}
