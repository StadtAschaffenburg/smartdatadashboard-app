import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, { LinkProps } from './LinkComponent'
import { scrollToElement } from '@/utils/scroll'
import Collapsible from '@/components/Elements/Collapsible'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cx } from 'class-variance-authority'

type BaseNavbarProps = {
  children?: React.ReactNode
  collapsible: boolean
  current_url: string
  site_id: string
  sitemap: PageMappingType[]
  page_title?: string
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  children,
  collapsible,
  current_url,
  page_title,
  site_id,
  sitemap,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [linkHome, setLinkHome] = useState<LinkProps[]>([])
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
            page.content.page_type === 'search'
              ? MagnifyingGlassIcon
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
    variant: 'inverse',
    size: 'md',
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
                ButtonClass="max-lg:min-w-80"
                LinkClass={cx(current_url === undefined ? 'active' : '')}
                onClick={handleLinkClick}
              />
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                {navLinks.map(l => (
                  <LinkComponent
                    key={l.link}
                    {...button_variants}
                    {...l}
                    ButtonClass="max-lg:min-w-80 hyphens-auto"
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

/*
  return (
    <nav
      aria-label="Hauptnavigation"
      className={`sticky top-0 z-50 max-h-[100dvh] overflow-auto transition-all [&.is-sticky]:shadow-lg ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      id="navbar"
      ref={navbarRef}
    >
      <Background className={''} variant={variant}>
        <Container className={''} variant={'flat'}>
          <div className="flex h-full w-full flex-col justify-between gap-4">
            <div className="flex h-20 items-stretch justify-between gap-8 text-white">

              <div className="flex min-w-0 items-center gap-4">
                {' '}
                <HomeButton href={`/${site_id !== 'default' ? site_id : ''}`} />
                <MenuButton isOpen={isOpen} setIsOpen={handleMenuToggle} />
                <div className="ml-2 hidden min-w-0 flex-shrink items-center gap-2 xs:flex">
                  <ChevronRightIcon className="inline h-4 w-4 shrink-0 text-white" />
                  <Text className="block max-w-full flex-shrink truncate text-white">
                    {page_title || 'SDD Frankfurt'}
                  </Text>
                </div>
              </div>

              <div className="flex h-20 items-center lg:h-full">
                <div className="hidden h-full flex-row items-stretch border-r border-light lg:flex">
                  {nav_links.map(l => (
                    <BarLink
                      key={l.link}
                      {...l}
                      LinkClass={
                        l.link.replace(/^\//, '') === current_url
                          ? 'active'
                          : ''
                      }
                      onClick={handleLinkClick}
                    />
                  ))}
                </div>
                <div className="items-center lg:hidden">
                  <SearchButton href={'/suche'} />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Collapsible isOpen={isOpen} onOpenChange={handleMenuToggle}>
          <Container variant="flat">
            <div className="flex flex-col gap-4 border-t-4 border-light pb-4 text-white">
              <div className={'mt-4 flex flex-col gap-2 lg:hidden lg:gap-4'}>
                <div className={'flex flex-col lg:gap-2'}>
                  {nav_links.map(l => (
                    <LinkComponent
                      key={l.link}
                      {...button_variants}
                      {...l}
                      ButtonClass={button_classes}
                      LinkClass={
                        l.link.replace(/^\//, '') === current_url
                          ? 'active'
                          : ''
                      }
                      onClick={handleLinkClick}
                    />
                  ))}
                </div>
              </div>
              <div className={'flex flex-col gap-2 py-4 lg:gap-4'}>
                <Text bold className="uppercase" family="condensed">
                  {getGlobalString('handlungsfelder')}:
                </Text>
                <ActionFieldList
                  hideIcon={true}
                  onClick={handleLinkClick}
                  sitemap={sitemap}
                />
              </div>
            </div>
          </Container>
        </Collapsible>
      </Background>
    </nav>
  )
}
*/