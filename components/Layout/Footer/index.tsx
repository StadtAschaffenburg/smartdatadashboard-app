'use client'

import Link from 'next/link'
import StairStepBackground from '../StairStepBackground'
import Title from '@/components/Elements/Title'
import Container from '../Container'
import Image from 'next/image'

import SmartCityMSLogo from '@/assets/logos/smart_city_ms.png'
import MuensterKlima2030 from '@/assets/logos/muenter_unser_klima_2030.png'
import StadtwerkeLogo from '@/assets/logos/Stadtwerke_Muenster_Logo.png'
import WFMLogo from '@/assets/logos/logo_wfm.png'
import BMWSBLogo from '@/assets/logos/BMWSB.png'
import KFW from '@/assets/logos/kfw.png'

export default function Footer() {
  return (
    <StairStepBackground>
      <Container>
        <div className="items-top flex w-full flex-col justify-around pb-10 lg:flex-row lg:gap-20 xl:pb-20 2xl:gap-44">
          <div className="flex-1">
            <Title as={'h4'} className="py-10 md:py-20">
              Ein Projekt von
            </Title>
            <div className="flex w-full grid-cols-2 flex-col gap-8 lg:gap-16 xl:grid">
              <div className="relative h-28 w-full md:h-36">
                <Link href="https://www.smartcity.ms">
                  <Image
                    alt="Smart City Münster Logo"
                    className="object-contain"
                    fill
                    src={SmartCityMSLogo}
                  />
                </Link>
              </div>
              <div className="relative h-28 w-full md:h-36">
                <Link href="https://www.stadt-muenster.de/klima/">
                  <Image
                    alt="Unser Klima Logo"
                    className="object-contain"
                    fill
                    src={MuensterKlima2030}
                  />
                </Link>
              </div>
            </div>
            <Title as={'h4'} className="py-10 md:py-20">
              Unterstützt durch
            </Title>
            <div className="flex w-full grid-cols-2 flex-col gap-8 lg:gap-16 xl:grid">
              <div className="relative h-28 w-full md:h-36">
                <Link href="https://www.stadtwerke-muenster.de/">
                  <Image
                    alt="Stadtwerke Aschaffenburg Logo"
                    className="object-contain"
                    fill
                    src={StadtwerkeLogo}
                  />
                </Link>
              </div>
              <div className="relative h-28 w-full md:h-36">
                <Link href="https://www.wfm-muenster.de/">
                  <Image
                    alt="Wirtschaftsförderung Aschaffenburg Logo"
                    className="object-contain"
                    fill
                    src={WFMLogo}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Title as={'h4'} className="py-10 md:py-20">
              Gefördert durch
            </Title>
            <div className="flex w-full grid-cols-2 flex-col gap-8 lg:gap-16 xl:grid">
              <div className="relative h-28 w-full md:h-36">
                <Image
                  alt="BMWSB Logo"
                  className="object-contain"
                  fill
                  src={BMWSBLogo}
                />
              </div>
              <div className="relative h-28 w-full md:h-36">
                <Image
                  alt="KfW  Logo"
                  className="object-contain"
                  fill
                  src={KFW}
                />
              </div>
            </div>
          </div>
          <div className="sm:hidden flex flex-1 flex-col 2xl:flex">
            <Title as={'h4'} className="py-10 opacity-0 md:py-20">
              Impressum
            </Title>
            <div className="flex flex-1 flex-col justify-between gap-8">
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
          </div>
        </div>
        <div className="sm:flex hidden justify-between 2xl:hidden">
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
