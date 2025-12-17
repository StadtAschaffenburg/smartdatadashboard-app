'use client'

import Container from '../Container'
import CityLogo from './LogoAB'
import PlatformLogo from './LogoSDD'
import Link from 'next/link'
import Title from '@/components/Elements/Title'

export default function Top({ site_id }: { site_id: string }) {
  return (
    <>
      <div className="z-10 w-full shadow-lg">
        <Container className="flex justify-start gap-8 py-6" variant={'flat'}>
          <Link href={'https://aschaffenburg.de'} target="_blank">
            <CityLogo />
          </Link>
        </Container>
      </div>

      <Container
        className="z-0 flex w-full items-center justify-between gap-8 py-1"
        variant={'flat'}
      >
        <Link href={`/${site_id !== 'default' ? site_id : ''}`}>
          <Title as="h2" className="uppercase" variant="primary">
            <div>Smart Data Dashboard</div>
            <div className="text-base xl:text-lg">Aschaffenburg</div>
          </Title>
        </Link>
        <PlatformLogo />
      </Container>
    </>
  )
}
