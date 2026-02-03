'use client'

import Link from 'next/link'
import PlatformLogo from './LogoSDD'
import Title from '@/components/Elements/Title'

export default function PlatformIdentity({ site_id }: { site_id: string }) {
  return (
    <Link className="flex items-center gap-12 align-middle py-2" href={`/${site_id !== 'default' ? site_id : ''}`}>
      <Title as="h2" className="uppercase md:mt-8 lg:mt-12" margin="none" variant="primary" weight="medium">
        <div>Smart Data Dashboard</div>
        <div className="text-base xl:text-lg">Aschaffenburg</div>
      </Title>
      <PlatformLogo />
    </Link>
  )
}