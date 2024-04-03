'use client'

import { Button } from '../../Elements/Button'
import Title from '@/components/Elements/Title'
import Back from '@/components/Elements/Back'
import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import InfoText from '../InfoText'
import { AnimatePresence, motion } from 'framer-motion'
import { MsKlimadashboardIconsNaviInfoI } from '@/components/Icons/Misc/Navi'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getJSON } from '@/utils/ContentFactory'

const routeToType: {
  [key: string]:
    | 'climate'
    | 'mobility'
    | 'energy'
    | 'building'
    | 'impressum'
    | 'datenschutz'
    | 'feedback'
} = {
  klima: 'climate',
  mobilitaet: 'mobility',
  energie: 'energy',
  gebaeude: 'building',
  impressum: 'impressum',
  datenschutz: 'datenschutz',
  feedback: 'feedback',
}

type SectionData = {
  [key: string]:
    | {
        title: string
        description: string
        id: string
        slug: string
      }
    | undefined
}

export default function Navbar() {
  const pathname = usePathname()

  const [sections_texte, setSectionstext] = useState<SectionData[]>([])

  useEffect(() => {
    const fetchSectionsText = async () => {
      const api =
        (process.env.NEXT_PUBLIC_SSD_API ||
          'http://smartcitydashboard-cms.test/api/') + 'content/sections'
      const data = await getJSON(api)

      if (data?.status === 'success') {
        setSectionstext(data?.payload)
      }
    }

    fetchSectionsText()
  }, [])

  const [showOverlay, setShowOverlay] = useState(false)

  if (!pathname) {
    return <BaseNavbar></BaseNavbar>
  }

  const isIndexPage = pathname === '/'
  const [_, route] = pathname?.split('/')

  const ActionComponent = isIndexPage ? (
    <Button
      className="whitespace-nowrap"
      onClick={() => setShowOverlay(true)}
      size={'link'}
      startIcon={
        <MsKlimadashboardIconsNaviInfoI className="h-[26px] md:h-[34px]" />
      }
      variant={'secondary'}
    >
      So helfen Daten dem Klima
    </Button>
  ) : (
    <Back
      variant={
        ['impressum', 'datenschutz', 'feedback'].includes(route)
          ? 'inverse'
          : 'primary'
      }
    />
  )

  const OverlayNavbar = (
    <BaseNavbar
      actionComponent={
        <Button
          className="whitespace-nowrap"
          onClick={() => setShowOverlay(false)}
          size={'link'}
          startIcon={<XMarkIcon className="h-[26px] text-white md:h-[34px]" />}
          variant={'secondary'}
        >
          <Title as="h5" variant={'inverse'}>
            Informationen ausblenden
          </Title>
        </Button>
      }
      variant="overlay"
    >
      <InfoText />
    </BaseNavbar>
  )

  if (isIndexPage) {
    return (
      <div className="relative">
        <BaseNavbar actionComponent={ActionComponent}>
          <div className="h-40" />
        </BaseNavbar>
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute left-0 top-0 z-10 h-full w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              {OverlayNavbar}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (
    [
      'klima',
      'energie',
      'mobilitaet',
      'gebaeude',
      'impressum',
      'datenschutz',
      'feedback',
    ].includes(route)
  ) {
    // TBD: this is a bit hacky, but it works for now
    const sectionKeys = ['klima', 'energie', 'mobilitaet', 'gebaeude']
    const sectionText: Record<string, string> = sectionKeys.reduce(
      (acc, key) => {
        const text = sections_texte as any // TODO: fix this
        acc[key] = text[key]?.description || 'Lade...'
        return acc
      },
      {} as Record<string, string>,
    )

    return (
      <BaseNavbar
        actionComponent={ActionComponent}
        variant={
          ['impressum', 'datenschutz', 'feedback'].includes(route)
            ? 'overlay'
            : 'primary'
        }
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          <div className="flex-1">
            <Title as="h5" variant="primary">
              {sectionText[route]}
            </Title>
          </div>
          <div className="flex flex-1 justify-end">
            <SectionTitle large variant={routeToType[route]} />
          </div>
        </div>
      </BaseNavbar>
    )
  }

  return <BaseNavbar actionComponent={ActionComponent}></BaseNavbar>
}
