'use client'

import Container from '../Container'
import CityLogo from './LogoAB'
import Link from 'next/link'
import PlatformIdentity from './PlatformIdentity'
import { ContentImage } from '@schleegleixner/react-statamic-api'
import Searchfield from '@/components/Elements/Searchfield'

export default function Top({
  site_id,
  hero_image = null
}: {
  site_id: string
  hero_image?: string | null
}) {
  return (
    <>
      <div className="z-10 w-full shadow-lg">
        <Container className="flex justify-start gap-8 py-6" variant={'flat'}>
          <Link href={'https://aschaffenburg.de'} target="_blank">
            <CityLogo />
          </Link>
        </Container>
      </div>

      {hero_image && (
        <div className="relative max-h-[67vh] w-full bg-slate-200 lg:aspect-[16/5] lg:min-h-80">
          <div className="absolute inset-0">
            <ContentImage className="absolute object-cover" src={hero_image} />
          </div>
          <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
            <Container className="flex mt-40 md:mt-0 md:justify-end" variant="compact">
              <div className="flex w-fit flex-col gap-4">
                <div className="w-fit rounded bg-white px-6 xs:px-8 md:px-12 lg:px-8 xl:px-12">
                  <PlatformIdentity site_id={site_id} />
                </div>
                <Searchfield />
              </div>
            </Container>
          </div>
        </div>
      )}

      {!hero_image && (
        <Container className="z-0 w-full" variant={'flat'}>
          <PlatformIdentity site_id={site_id} />
        </Container>
      )}
    </>
  )
}
