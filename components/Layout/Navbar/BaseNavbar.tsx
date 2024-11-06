import React, { useState } from 'react'
import Background from '@/components/Layout/Background'
import Collapsible from '@/components/Elements/Collapsible'
import Container from '@/components/Layout/Container'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'
import LinkComponent, { LinkProps } from './LinkComponent'
import {
  MsKlimadashboardIconsButtonAktivEnergieV1,
  MsKlimadashboardIconsButtonAktivGebaeude,
  MsKlimadashboardIconsButtonAktivKlima,
} from '@/components/Icons/Misc'

const links: LinkProps[] = [
  {
    icon: MsKlimadashboardIconsButtonAktivGebaeude,
    link: '/',
    hover: 'secondary',
  },
  {
    title: 'Aschaffenburg Live',
    icon: MsKlimadashboardIconsButtonAktivKlima,
    link: '/ab-live',
    hover: 'secondary',
  },
  {
    title: 'Handlungsdimensionen',
    icon: MsKlimadashboardIconsButtonAktivEnergieV1,
    link: '/handlungsdimensionen',
    hover: 'secondary',
  },
  {
    title: 'SDG-Ziele',
    icon: MsKlimadashboardIconsButtonAktivEnergieV1,
    link: '/sdg-ziele',
    hover: 'secondary',
  },
]

type BaseNavbarProps = {
  title?: string
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  title,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="sticky top-0 z-50">
      <Background variant={variant}>
        <Container>
          <Collapsible
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            trigger={
              <div className="flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between gap-8">
                  <Title
                    as="h2"
                    variant={variant === 'primary' ? 'inverse' : 'primary'}
                  >
                    {title || 'Smart Data Dashboard'}
                  </Title>
                  <div className="flex items-center gap-4 font-bold text-white [.collapsible-open_&]:text-secondary">
                    <div>MENÜ</div>{' '}
                    <div className="border-2 border-white p-4 [.collapsible-open_&]:border-secondary">
                      <Bars3Icon className="w-5 stroke-2 text-white md:w-6" />
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div className="mt-4 flex items-center justify-between">
              {links.map(l => (
                <LinkComponent
                  key={l.link}
                  variant={variant === 'primary' ? 'inverse' : 'primary'}
                  {...l}
                  onClick={handleLinkClick}
                />
              ))}
            </div>
          </Collapsible>
        </Container>
      </Background>
    </div>
  )
}
