'use client'

import Container from '../Container'
import LogoAB from './LogoAB'
import LogoSDD from './LogoSDD'
import Link from 'next/link'

export default function Top() {
  return (
    <Container
      className="flex w-full items-center justify-between gap-8"
      variant={'compact'}
    >
      <Link href={'/'}>
        <LogoAB />
      </Link>
      <LogoSDD />
    </Container>
  )
}
