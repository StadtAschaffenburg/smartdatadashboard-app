'use client'

import Link from 'next/link'
import Background from '../Background'
import Container from '../Container'
import { scrollToTop } from '@/utils/scroll'
import ImageFoerderung from '@/assets/images/foerderung.jpg'
import ImageStadtbau from '@/assets/images/logo_stadtbau.jpg'
import ImageAsta from '@/assets/images/STA_Logo_Stadtwerke_CMYK.jpg'
import ImageGesta from '@/assets/images/GreLos_Logo_4C.jpg'
import Image from 'next/image'
import Text from '@/components/Elements/Text'

const handleLinkClick = () => {
  scrollToTop()
}

export default function Footer() {
  return (
    <>
      <Background light>
        <Container variant="flat">
          <div className="flex flex-col items-center gap-4 py-8 xs:flex-row xs:justify-between xs:py-16">
            <Link href="/impressum" onClick={handleLinkClick}>
              <Text as="h5" className="underline" variant={'primary'}>
                Impressum
              </Text>
            </Link>
            <Link href="/datenschutz" onClick={handleLinkClick}>
              <Text as="h5" className="underline" variant={'primary'}>
                Datenschutz
              </Text>
            </Link>
            <Link href="/adaptieren" onClick={handleLinkClick}>
              <Text as="h5" className="underline" variant={'primary'}>
                Dashboard adaptieren
              </Text>
            </Link>
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
              <div className="align-start flex h-24 gap-4">
                <Image
                  alt="Gesta Logo"
                  className="h-full w-40 object-contain"
                  loading="lazy"
                  src={ImageGesta}
                  width={512}
                />
                <Image
                  alt="Stadtbau Logo"
                  className="h-full w-40 object-contain"
                  loading="lazy"
                  src={ImageStadtbau}
                  width={512}
                />
                <Image
                  alt="Stadtbau Logo"
                  className="h-full w-24 object-contain"
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
