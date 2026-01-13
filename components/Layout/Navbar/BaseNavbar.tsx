import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, { LinkProps } from './LinkComponent'
import { scrollToElement } from '@/utils/scroll'
import Collapsible from '@/components/Elements/Collapsible'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
// import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cx } from 'class-variance-authority'
import { IconHome } from '@/components/Icons/Navigation'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'

type BaseNavbarProps = {
  children?: React.ReactNode
  collapsible: boolean
  current_url: string
  sitemap: PageMappingType[]
  variant?: 'primary' | 'secondary'
}

const linkHome: LinkProps = {
  icon: IconHome,
  title: 'Startseite',
  link: '/',
  IconClass:
    'h-4 text-white group-hover:text-primary md:h-6 [.active_&]:text-primary',
}

export default function BaseNavbar({
  children,
  collapsible,
  current_url,
  sitemap,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [navLinks, setNavLinks] = useState<LinkProps[]>([])
  const navbarRef = useRef<HTMLDivElement | null>(null)

  // foreach link in sitemap, add the link to links_categories
  useEffect(() => {
    if (!sitemap || sitemap.length === 0) {
      return
    }

    const fetchLinks = async () => {
      const menu_links = sitemap
        .filter((page: any) => page.content.menu_position === 'main')
        .map((page: any) => ({
          title: page.title,
          link: `${page.full_url}`,
          icon:
            page.content.category === 'ab_live'
              ? PulsatingCircle
              : undefined,
            IconClass:
              page.content.category === 'ab_live'
                ? 'stroke-secondary fill-secondary h-4 text-white group-hover:text-primary md:h-6 [.active_&]:text-primary'
                : undefined,
        }))

      setNavLinks([...menu_links])
    }

    fetchLinks()
  }, [sitemap])

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
    scrollToElement('app-root', 0)
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const button_variants: Partial<LinkProps> = {
    variant: 'white',
    size: 'main_menu',
  }

  return (
    <div
      className={`sticky top-0 z-50 ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      id="navbar"
      ref={navbarRef}
    >
      <Background variant={variant}>
        <Container
          className={'py-4 transition-all [.is-sticky_&]:shadow-lg'}
          variant={'flat'}
        >
          <Collapsible isOpen={collapsible}>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-8">
                {children || 'Smart Data Dashboard'}
                <div
                  className="flex cursor-pointer items-center gap-4 font-medium text-white"
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
          </Collapsible>

          <Collapsible
            isOpen={collapsible ? isOpen : true}
            onOpenChange={setIsOpen}
          >
            <div
              className={cx(
                'flex flex-col flex-nowrap justify-between gap-4 max-md:items-center md:flex-row lg:items-center lg:gap-8',
                {
                  'mt-4': collapsible,
                },
              )}
            >
                <LinkComponent
                  {...button_variants}
                  {...linkHome}
                  className={cx(
                    'self-start max-lg:min-w-80',
                    current_url === undefined ? 'active' : 'active',
                  )}
                  onClick={handleLinkClick}
                />
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                {navLinks.map(l => (
                  <LinkComponent
                    key={l.link}
                    {...button_variants}
                    {...l}
                    className={cx(
                      'hyphens-auto max-lg:min-w-80',
                      l.link.replace(/^\//, '') === current_url ? 'active' : '',
                    )}
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
