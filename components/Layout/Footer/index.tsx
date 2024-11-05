'use client'

import Link from 'next/link'
import Background from '../Background'
import Title from '@/components/Elements/Title'
import Container from '../Container'

export default function Footer() {
  return (
    <Background light>
      <Container>
        <div className="flex justify-between gap-4 py-16">
          <Link href="/impressum">
            <Title as="h5" className="underline" variant={'primary'}>
              Impressum
            </Title>
          </Link>
          <Link href="/datenschutz">
            <Title as="h5" className="underline" variant={'primary'}>
              Datenschutz
            </Title>
          </Link>
          <Link href="/adaptieren">
            <Title as="h5" className="underline" variant={'primary'}>
              Dashboard adaptieren
            </Title>
          </Link>
        </div>
      </Container>
    </Background>
  )
}
