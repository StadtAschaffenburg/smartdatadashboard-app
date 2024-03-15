import ProgressBar from '@/components/Charts/Progress/ProgressBar'
import Title from '@/components/Elements/Title'
import EnergyTile from '../EnergyTile'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import { MsKlimadashboardIconsEWindkraft } from '@/components/Icons/Energie'

// interface WindDataType {
//   ZEIT: string
//   AnzahlAnlagen: number
//   AnzahlSolarModule: number
//   Bruttoleistung: number
//   Nettonennleistung: number
// }

export default function WindEnergyTile() {
  {
    /* const [data] = WindData as WindDataType[] */
  }

  return (
    <EnergyTile
      dataRetrieval="05.06.2023"
      dataSource="Stadt Aschaffenburg &ndash; Stadtplanungsamt"
      embedId="energy-wind"
      title={
        <>
          <AnimatedNumber>{62}</AnimatedNumber> MW
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>
          haben Organisationen bereits mit{' '}
          <span className="text-energy">
            {/* <AnimatedNumber>{data.AnzahlAnlagen}</AnimatedNumber>{' '} */}
            32 Windkraftanlagen
          </span>{' '}
          in Münster installiert.
        </Title>
        <div className="mt-8 flex items-center justify-between gap-8">
          <MsKlimadashboardIconsEWindkraft className="w-40" />
          <div className="w-full flex-1">
            <div className="flex  items-center justify-between">
              <div>
                <Title as="h7" font="semibold" variant={'energy'}>
                  Bereits installiert
                </Title>
                <Title as="h4" variant={'energy'}>
                  {/* (data.Bruttoleistung}/90).toFixed(0) */}
                  69%
                </Title>
              </div>
              <div className="flex flex-col items-end">
                <Title as="h7" font="semibold" variant={'primary'}>
                  Angestrebtes Ziel bis 2030
                </Title>
                <Title as="h4" variant={'primary'}>
                  90 MW
                </Title>
              </div>
            </div>
            <Spacer size={'sm'} />
            {/* should be the following, once some organisation is reliably able to count windraeder ...
                data.Bruttoleistung}/90
            */}
            <ProgressBar progress={69} variant="energy" />
            {/*
            <Spacer size={'sm'} />
            <Slider
              defaultValue={[0]}
              labels={['2005', '2010', '2015', '2020', 'jetzt']}
              max={4}
              min={0}
              variant={'energy'}
            />
            */}
          </div>
        </div>
      </div>
    </EnergyTile>
  )
}
