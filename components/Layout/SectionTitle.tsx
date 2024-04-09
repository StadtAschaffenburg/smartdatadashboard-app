import { cva, cx, VariantProps } from 'class-variance-authority'
import Title from '../Elements/Title'
import {
  MsKlimadashboardIconsButtonAktivEnergieV1,
  MsKlimadashboardIconsButtonAktivGebaeude,
  MsKlimadashboardIconsButtonAktivKlima,
  MsKlimadashboardIconsButtonAktivMobil,
} from '@/components/Icons/Misc'

import { SVGProps } from 'react'

const sectionHeaderStyle = cva('', {
  variants: {
    variant: {
      climate: 'text-climate border-climate',
      mobility: 'text-mobility border-mobility',
      building: 'text-buildings border-buildings',
      energy: 'text-energy border-energy',
      impressum: 'text-white',
      datenschutz: 'text-white',
      adaptieren: 'text-white',
    },
  },
})

export default function SectionTitle({
  variant,
  large,
}: VariantProps<typeof sectionHeaderStyle> & {
  large?: boolean
}) {
  let title: string | React.ReactNode = 'Aschaffenburg'
  let Icon: ((_: SVGProps<SVGSVGElement>) => JSX.Element) | undefined =
    MsKlimadashboardIconsButtonAktivKlima

  if (variant === 'climate') {
    title = 'Klima in Aschaffenburg'
  }
  if (variant === 'mobility') {
    title = 'Mobilität'
    Icon = MsKlimadashboardIconsButtonAktivMobil
  }
  if (variant === 'building') {
    title = 'Gebäude'
    Icon = MsKlimadashboardIconsButtonAktivGebaeude
  }
  if (variant === 'energy') {
    title = 'Energie'
    Icon = MsKlimadashboardIconsButtonAktivEnergieV1
  }
  if (variant === 'impressum') {
    title = 'Impressum'
    Icon = undefined
  }
  if (variant === 'datenschutz') {
    title = 'Datenschutz'
    Icon = undefined
  }
  if (variant === 'adaptieren') {
    title = (
      <span>
        Dashboard <br /> adaptieren
      </span>
    )
    Icon = undefined
  }

  return (
    <div className="flex items-center space-x-4">
      {Icon && (
        <div
          className={cx(
            'h-14 w-20 rounded-full border-2 p-2',
            sectionHeaderStyle({ variant }),
          )}
        >
          <Icon className="mx-auto h-full" />
        </div>
      )}
      <Title
        as={large ? 'h2' : 'h4'}
        variant={
          ['impressum', 'datenschutz', 'adaptieren'].includes(variant!)
            ? 'inverse'
            : 'primary'
        }
      >
        {title}
      </Title>
    </div>
  )
}
