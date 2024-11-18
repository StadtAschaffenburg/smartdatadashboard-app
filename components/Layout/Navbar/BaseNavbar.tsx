import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Collapsible from '@/components/Elements/Collapsible'
import Container from '@/components/Layout/Container'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LinkComponent, { LinkProps } from './LinkComponent'
import { IconHome } from '@/components/Icons/Navigation'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'

const link_home: LinkProps = {
  icon: IconHome,
  title: 'Startseite',
  link: '/',
}

const links: LinkProps[] = [
  {
    icon: PulsatingCircle,
    title: 'Aschaffenburg Live',
    link: '/aschaffenburg-live',
  },
  {
    title: 'Handlungsdimensionen',
    link: '/handlungsdimensionen',
  },
  {
    title: 'Nachhaltigkeitsziele',
    link: '/nachhaltigkeitsziele',
  },
]

type BaseNavbarProps = {
  children?: React.ReactNode
  current_url: string
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  children,
  current_url,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const navbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const { top } = navbarRef.current.getBoundingClientRect()
        if (window?.scrollY === 0) {
          setIsSticky(false)
        } else if (top <= 0) {
          setIsSticky(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const button_variants: Partial<LinkProps> = {
    variant: 'inverse',
    size: 'main_menu',
  }

  return (
    <div
      className={`sticky top-0 z-50 ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      ref={navbarRef}
    >
      <Background variant={variant}>
        <Container
          className={
            'py-6 transition-all [.is-sticky_&]:py-4 [.is-sticky_&]:shadow-lg'
          }
          variant="none"
        >
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between gap-8">
              {children || 'Smart Data Dashboard'}
              <div
                className="flex cursor-pointer items-center gap-4 font-medium text-white "
                onClick={toggleMenu}
              >
                <div>Menü</div>{' '}
                <div className="group overflow-hidden rounded border border-white">
                  {isOpen ? (
                    <XMarkIcon className="stroke w-8 bg-white p-2 text-primary transition-all md:w-12" />
                  ) : (
                    <Bars3Icon className="stroke w-8 p-2 text-white transition-all group-hover:bg-white group-hover:text-primary md:w-12" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Collapsible isOpen={isOpen} onOpenChange={setIsOpen}>
            <div className="mt-4 flex flex-nowrap items-center justify-between gap-8">
              <LinkComponent
                {...button_variants}
                {...link_home}
                LinkClass={current_url === '' ? 'active' : ''}
                onClick={handleLinkClick}
              />
              <div className="flex items-center gap-4">
                {links.map(l => (
                  <LinkComponent
                    key={l.link}
                    {...button_variants}
                    {...l}
                    LinkClass={
                      l.link.replace(/^\//, '') === current_url ? 'active' : ''
                    }
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
            </div>
          </Collapsible>
        </Container>
      </Background>
    </div>
  )
}
