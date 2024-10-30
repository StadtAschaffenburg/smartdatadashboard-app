import { ForwardRefExoticComponent, SVGProps } from 'react'
import {
  MsKlimadashboardIconsWetterNiederschlag,
  MsKlimadashboardIconsWetterSonnig,
  MsKlimadashboardIconsWetterTemperatur,
  MsKlimadashboardIconsWetterWindgeschw,
  MsKlimadashboardIconsWetterWolkendichte,
} from '@/components/Icons/Klima'

export type PhenomenaType = {
  [key: string]: {
    title: string
    shortTitle?: string
    unit: string
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
      | React.ForwardRefExoticComponent<
          Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined
            titleId?: string | undefined
          } & React.RefAttributes<SVGSVGElement>
        >
    decimals?: number
  }
}

export const phenomena: PhenomenaType = {
  temperature: {
    title: 'Temperatur',
    unit: '°C',
    icon: MsKlimadashboardIconsWetterTemperatur,
    decimals: 0,
  },
  precipitation: {
    title: 'Niederschlag',
    unit: 'mm',
    icon: MsKlimadashboardIconsWetterNiederschlag,
  },
  cloudcover: {
    title: 'Wolken&shy;bedeckung',
    shortTitle: 'Wolkenbed.',
    unit: '%',
    icon: MsKlimadashboardIconsWetterWolkendichte,
  },
  windspeed: {
    title: 'Wind&shy;geschwindigkeit',
    shortTitle: 'Windgeschw.',
    unit: 'km/h',
    icon: MsKlimadashboardIconsWetterWindgeschw,
    decimals: 1,
  },
  winddirection: {
    title: 'Wind&shy;richtung',
    shortTitle: 'Windricht.',
    unit: '°',
    icon: MsKlimadashboardIconsWetterWindgeschw,
  },
  sunhours: {
    title: 'Sonnenstunden',
    unit: 'h',
    icon: MsKlimadashboardIconsWetterSonnig,
  },
  solar_radiation: {
    title: 'Sonneneinstrahlung',
    unit: 'W/m²',
    icon: MsKlimadashboardIconsWetterSonnig,
  },
  humidity: {
    title: 'Luft&shy;feuchtigkeit',
    unit: '%',
    icon: MsKlimadashboardIconsWetterSonnig,
  },
  pressure: {
    title: 'Luft&shy;druck',
    unit: 'hPa',
    icon: MsKlimadashboardIconsWetterSonnig,
  },
}

export type PhenomenonProps = {
  phenomenon: keyof typeof phenomena
  value: number
  size?: 'md' | 'xl'
  meta?: string
  hide_icon?: boolean
}
