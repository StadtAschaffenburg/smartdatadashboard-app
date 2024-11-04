'use client'

import Container from '../Container'
import LogoAB from './LogoAB'
import LogoSSD from './LogoSSD'
import Link from 'next/link'

export default function Top() {
  return (
    <Container className="flex w-full items-center justify-between gap-8">
      <Link href={'/'}>
        <LogoAB />
      </Link>
      <LogoSSD />
    </Container>
  )
}
