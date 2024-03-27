'use client'

import Link from 'next/link'
import StairStepBackground from '../StairStepBackground'
import Title from '@/components/Elements/Title'
import Container from '../Container'

export default function Footer() {
  return (
    <StairStepBackground>
      <Container>
        <div className="flex justify-between py-16">
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
          <Link href="/feedback#use-dashboard">
            <Title as="h5" className="underline" variant={'primary'}>
              Dieses Dashboard adaptieren
            </Title>
          </Link>
          <Link href="/feedback#feedback">
            <Title as="h5" className="underline" variant={'primary'}>
              Feedback geben
            </Title>
          </Link>
        </div>
      </Container>
    </StairStepBackground>
  )
}
