'use client'

import Container from '../Container'
import LogoAB from './LogoAB'
import LogoSDD from './LogoSDD'
import Link from 'next/link'
import Title from '@/components/Elements/Title'

export default function Top() {
  return (
    <>
      <Container
        className="z-10 flex w-full justify-start gap-8 py-6 shadow-lg"
        variant={'flat'}
      >
        <Link href={'https://aschaffenburg.de'} target="_blank">
          <LogoAB />
        </Link>
      </Container>

      <Container
        className="z-0 flex w-full items-center justify-between gap-8 py-1"
        variant={'flat'}
      >
        <Title as="h1" className="uppercase" variant="primary">
          <Link href={'/'}>Smart Data Dashboard</Link>
        </Title>
        <LogoSDD />
      </Container>
    </>
  )
}
