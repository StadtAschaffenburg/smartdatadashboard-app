import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Collapsible from '@/components/Elements/Collapsible'
import Container from '@/components/Layout/Container'
import { Bars3Icon } from '@heroicons/react/24/outline'
import LinkComponent, { LinkProps } from './LinkComponent'
import { IconGear, IconHome } from '@/components/Icons/Navigation'

const links: LinkProps[] = [
  {
    icon: IconHome,
    link: '/',
    hover: 'secondary',
  },
  {
    title: 'Aschaffenburg Live',
    icon: IconGear,
    link: '/aschaffenburg-live',
    hover: 'secondary',
  },
  {
    title: 'Handlungsdimensionen',
    icon: IconGear,
    link: '/handlungsdimensionen',
    hover: 'secondary',
  },
  {
    title: 'SDG-Ziele',
    icon: IconGear,
    link: '/sdg-ziele',
    hover: 'secondary',
  },
]

type BaseNavbarProps = {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  children,
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

  return (
    <div
      className={`sticky top-0 z-50 ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      ref={navbarRef}
    >
      <Background variant={variant}>
        <Container
          className={
            'py-12 transition-all [.is-sticky_&]:py-4 [.is-sticky_&]:shadow-lg'
          }
          variant="none"
        >
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between gap-8">
              {children || 'Smart Data Dashboard'}
              <div
                className="flex items-center gap-4 font-bold text-white [.collapsible-open_&]:text-secondary"
                onClick={toggleMenu}
              >
                <div>MENÜ</div>{' '}
                <div className="border-2 border-white p-4 [.collapsible-open_&]:border-secondary">
                  <Bars3Icon className="w-5 stroke-2 text-white md:w-6" />
                </div>
              </div>
            </div>
          </div>
          <Collapsible isOpen={isOpen} onOpenChange={setIsOpen}>
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
