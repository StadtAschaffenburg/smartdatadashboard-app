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
          <Link href="https://www.aschaffenburg.de/Impressum/DE_index_1846.html">
            <Title as="h5" className="underline" variant={'primary'}>
              Impressum
            </Title>
          </Link>
          <Link href="https://www.aschaffenburg.de/Aktuelles/Datenschutz-/DE_index_4181.html">
            <Title as="h5" className="underline" variant={'primary'}>
              Datenschutz
            </Title>
          </Link>
          <Link href="/feedback#use-dashboard">
            <Title as="h5" className="underline" variant={'primary'}>
              Quellenverweise
            </Title>
          </Link>
        </div>
      </Container>
    </StairStepBackground>
  )
}
