'use client'

import Link from 'next/link'
import Background from '../Background'
import Container from '../Container'
import ImageFoerderung from '@/assets/images/foerderung.jpg'
import ImageStadtbau from '@/assets/images/logo_stadtbau.jpg'
import ImageAsta from '@/assets/images/STA_Logo_Stadtwerke_CMYK.jpg'
import ImageGesta from '@/assets/images/GreLos_Logo_4C.jpg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Text from '@/components/Elements/Text'
import { scrollToTop } from '@/utils/scroll'

export type LinkProps = {
  ariaLabel?: string
  title?: string
  link: string
}

const handleLinkClick = () => {
  scrollToTop()
}

export default function Footer({ sitemap }: { sitemap: PageMappingType[] }) {
  const [nav_links, setNavLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    if (!sitemap || sitemap.length === 0) {
      return
    }

    const fetchLinks = async () => {
      const footer_links = sitemap
        .filter((page: any) => page.content.menu_position === 'footer')
        .map((page: any) => ({
          title: page.title,
          link: `${page.full_url}`,
        }))

      setNavLinks([...footer_links])
    }

    fetchLinks()
  }, [sitemap])

  return (
    <>
      <Background light>
        <Container variant="flat">
          <div className="flex flex-col items-center gap-4 py-8 xs:flex-row xs:justify-between xs:py-16">
            {nav_links.map((link: LinkProps) => (
              <Link href={link.link} key={link.link} onClick={handleLinkClick}>
                <Text as="h5" className="underline" variant={'primary'}>
                  {link.title}
                </Text>
              </Link>
            ))}
          </div>
        </Container>
      </Background>

      <Background variant="white">
        <Container variant="compact">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="md:w-1/2">
              <Image
                alt="Förderung Logos"
                className="w-full"
                loading="lazy"
                src={ImageFoerderung}
                width={1280}
              />
            </div>
            <div className="flex flex-col gap-2 lg:items-end">
              <Text as="xxs">Datenpaten</Text>
              <div className="align-start grid h-24 grid-cols-3 gap-4 md:flex">
                <Image
                  alt="Gesta Logo"
                  className="w-full object-contain md:h-full md:w-40"
                  loading="lazy"
                  src={ImageGesta}
                  width={512}
                />
                <Image
                  alt="Stadtbau Logo"
                  className="w-full object-contain md:h-full md:w-40"
                  loading="lazy"
                  src={ImageStadtbau}
                  width={512}
                />
                <Image
                  alt="Stadtbau Logo"
                  className="w-full object-contain md:h-full md:w-24"
                  loading="lazy"
                  src={ImageAsta}
                  width={512}
                />
              </div>
            </div>
          </div>
        </Container>
      </Background>
    </>
  )
}
