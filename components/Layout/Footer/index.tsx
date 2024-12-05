'use client'

import Link from 'next/link'
import Background from '../Background'
import Title from '@/components/Elements/Title'
import Container from '../Container'
import { scrollToTop } from '@/utils/scroll'

const handleLinkClick = () => {
  scrollToTop()
}

export default function Footer() {
  return (
    <Background light>
      <Container>
        <div className="flex flex-col items-center gap-4 py-8 xs:flex-row xs:justify-between xs:py-16">
          <Link href="/impressum" onClick={handleLinkClick}>
            <Title as="h5" className="underline" variant={'primary'}>
              Impressum
            </Title>
          </Link>
          <Link href="/datenschutz" onClick={handleLinkClick}>
            <Title as="h5" className="underline" variant={'primary'}>
              Datenschutz
            </Title>
          </Link>
          <Link href="/adaptieren" onClick={handleLinkClick}>
            <Title as="h5" className="underline" variant={'primary'}>
              Dashboard adaptieren
            </Title>
          </Link>
        </div>
      </Container>
    </Background>
  )
}
