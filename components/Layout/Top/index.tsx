'use client'

import Container from '../Container'
import Background from '../Background'
import LogoAB from './LogoAB'
import LogoSDD from './LogoSDD'
import Link from 'next/link'

export default function Top() {
  return (
    <>
      <Container
        className="flex w-full justify-start gap-8"
        variant={'compact'}
      >
        <Link href={'/'}>
          <LogoAB />
        </Link>
      </Container>
      <Background light>
        <Container className="flex w-full justify-end gap-8" variant={'flat'}>
          <LogoSDD />
        </Container>
      </Background>
    </>
  )
}
