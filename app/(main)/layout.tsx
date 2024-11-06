import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Providers from '@/components/Layout/Providers'
import Top from '@/components/Layout/Top'

export const revalidate = false

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Top />
      <Navbar />
      <div className="flex-1">
        <Providers>{children}</Providers>
      </div>
      <Footer />
    </div>
  )
}
