'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Container from '../Container'
import CityLogo from './LogoAB'
import Link from 'next/link'
import PlatformIdentity from './PlatformIdentity'
import {
  ContentImage,
  PageMappingType,
} from '@schleegleixner/react-statamic-api'
import Searchfield from '@/components/Elements/Searchfield'
import { getCurrentPageClient } from '@/components/ClientPageWrapper'
import { useContentWidth } from '@schleegleixner/react-statamic-api'

export default function Top({
  site_id,
  sitemap,
}: {
  site_id: string
  sitemap: PageMappingType[]
}) {
  const pathname = usePathname()
  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [heroImageMobile, setHeroImageMobile] = useState<string | null>(null)
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()

  useEffect(() => {
    const pageData = getCurrentPageClient(sitemap, pathname)
    setHeroImage(pageData?.content?.hero_image ?? null)
    setHeroImageMobile(pageData?.content?.hero_image_mobile ?? null)
  }, [pathname, sitemap])

  return (
    <>
      <div ref={elRef} className="z-10 w-full shadow-lg">
        <Container className="flex justify-start gap-8 py-6" variant={'flat'}>
          <Link href={'https://aschaffenburg.de'} target="_blank">
            <CityLogo />
          </Link>
        </Container>
      </div>

      {heroImage && (
        <div className="relative max-h-[67vh] w-full bg-slate-200 aspect-square lg:aspect-[16/5] lg:min-h-80">
          <div className="absolute inset-0">
            <ContentImage
              className="absolute object-cover"
              src={
                contentWidth < 768 && heroImageMobile
                  ? heroImageMobile
                  : heroImage
              }
            />
          </div>
          <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
            <Container
              className="mt-40 flex md:mt-0 md:justify-end"
              variant="flat"
            >
              <div className="flex w-fit flex-col gap-4 mb-4">
                <div className="w-fit rounded bg-white px-6 md:px-8 xl:px-8">
                  <PlatformIdentity site_id={site_id} />
                </div>
                <Searchfield />
              </div>
            </Container>
          </div>
        </div>
      )}

      {!heroImage && (
        <Container className="z-0 w-full" variant={'flat'}>
          <PlatformIdentity site_id={site_id} />
        </Container>
      )}
    </>
  )
}
