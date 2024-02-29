import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import EnergyTile from '../EnergyTile'

// @ts-ignore
import PVData from '@/assets/data/bestand-pv-anlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import ProgressBar from '@/components/Charts/Progress/ProgressBar'
import { format } from 'date-fns'
import { MsKlimadashboardIconsEPvAnlagen } from '@/components/Icons/Energie'

interface PVDataType {
  ZEIT: string
  AnzahlAnlagen: number
  AnzahlSolarModule: number
  Bruttoleistung: number
  Nettonennleistung: number
}

export default function PhotovoltTile() {
  const [data] = PVData as PVDataType[]

  return (
    <EnergyTile
      dataRetrieval={format(new Date(data.ZEIT), 'dd.MM.yyyy')}
      dataSource={'Marktstammdatenregister'}
      embedId="energy-PV"
      title={
        <>
          <AnimatedNumber>{data.Bruttoleistung / 1000}</AnimatedNumber> MWp
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>
          haben die Münsteraner*innen bereits mit{' '}
          <span className="text-energy">
            <AnimatedNumber>{data.AnzahlAnlagen}</AnimatedNumber> PV-Anlagen
          </span>{' '}
          in Münster installiert.
        </Title>
        <div className="mt-8 flex items-center justify-between gap-8">
          <MsKlimadashboardIconsEPvAnlagen className="w-40" />
          <div className="w-full flex-1">
            <div className="flex  items-center justify-between">
              <div>
                <Title as="h7" font="semibold" variant={'energy'}>
                  Bereits installiert
                </Title>
                <Title as="h4" variant={'energy'}>
                  {((data.Bruttoleistung / 1000 / 2400) * 100).toFixed(0)}%
                </Title>
              </div>
              <div className="flex flex-col items-end">
                <Title as="h7" font="semibold" variant={'primary'}>
                  Angestrebtes Ziel bis 2030
                </Title>
                <Title as="h4" variant={'primary'}>
                  2.400 MWp
                </Title>
              </div>
            </div>
            <Spacer size={'sm'} />
            <ProgressBar
              progress={(data.Bruttoleistung / 1000 / 2400) * 100}
              variant="energy"
            />
            {/*
            <Spacer size={'sm'} />
            <Slider
              defaultValue={[0]}
              labels={['2005', '2010', '2015', '2020', 'jetzt']}
              max={4}
              min={0}
              variant={'energy'}
            />*/}
          </div>
        </div>
      </div>
    </EnergyTile>
  )
}
