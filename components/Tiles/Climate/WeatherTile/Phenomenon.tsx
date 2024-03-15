import { ForwardRefExoticComponent, SVGProps } from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import useDevice from '@/hooks/useDevice'
import { MsKlimadashboardIconsWetterNiederschlag, MsKlimadashboardIconsWetterSonnig, MsKlimadashboardIconsWetterTemperatur, MsKlimadashboardIconsWetterWindgeschw, MsKlimadashboardIconsWetterWolkendichte } from '@/components/Icons/Klima'

type PhenomenaType = {
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

const phenomena: PhenomenaType = {
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

type PhenomenonProps = {
  phenomenon: keyof typeof phenomena
  value: number
  size?: 'md' | 'xl',
  meta: string | false
}

export default function Phenomenon({
  phenomenon,
  value,
  meta = false,
  size = 'md',
}: PhenomenonProps) {
  const { title, unit, icon, decimals, shortTitle } = phenomena[phenomenon]

  const valueSize: 'h1' | 'h4' = size === 'xl' ? 'h1' : 'h4'

  const device = useDevice()

  const Icon = icon
  return (
    <div className="my-1 flex items-center gap-3 md:my-2">
      <Icon
        className={cx(
          size === 'md' ? 'aspect-square' : 'w-6',
          'h-10 fill-primary stroke-primary text-primary md:h-14',
        )}
      />
      <div>
        <Title
          as={'h5'}
          dangerouslySetInnerHTML={{
            __html: device === 'mobile' && shortTitle ? shortTitle : title,
          }}
          variant={'primary'}
        ></Title>
        <Title as={valueSize} variant="climate">
          <AnimatedNumber decimals={decimals}>{value}</AnimatedNumber> {unit} {meta}
        </Title>
      </div>
    </div>
  )
}
