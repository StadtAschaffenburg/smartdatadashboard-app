import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'

import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'

import {
  MsKlimadashboardIconsGArena,
  MsKlimadashboardIconsGBibliothek,
  MsKlimadashboardIconsGRathaus,
  MsKlimadashboardIconsGSchule,
} from '@/components/Icons/Gebaeude'

type DataType = {
  Datum: number
  brentanoschule: number | null
  stadtbibliothek: number | null
  frankenstolz_arena: number | null
  rathaus: number | null
}

type Building = Omit<DataType, 'Datum'>

const buildings: Record<keyof Building, string> = {
  rathaus: 'Rathaus',
  frankenstolz_arena: 'F.A.N Frankenstolz Arena',
  stadtbibliothek: 'Stadtbibliothek',
  brentanoschule: 'Bentanoschule',
}

const buildingIcon: Record<
  keyof Building,
  (_props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  brentanoschule: MsKlimadashboardIconsGSchule,
  stadtbibliothek: MsKlimadashboardIconsGBibliothek,
  frankenstolz_arena: MsKlimadashboardIconsGArena,
  rathaus: MsKlimadashboardIconsGRathaus,
}

function getBuildingIcon(
  building: keyof Building,
  props?: SVGProps<SVGSVGElement>,
) {
  const Icon = buildingIcon[building]
  return <Icon {...props} />
}

function getData(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  stromData: DataType[],
  waermeData: DataType[],
  year: number,
) {
  const data: DataType[] = mode === 'strom' ? stromData : waermeData

  const filteredYear = data.filter(
    d => year === new Date(d.Datum).getFullYear(),
  )

  return filteredYear.map(d => d[building]).filter(d => d !== null) as number[]
}

function getYearSum(
  mode: 'strom' | 'waerme',
  building: keyof Building,
  stromData: DataType[],
  waermeData: DataType[],
  year: number,
) {
  const data = getData(mode, building, stromData, waermeData, year)

  return data.reduce((a, b) => a + b, 0)
}

interface DesktopViewProps {
  mode: 'strom' | 'waerme'
  stromData: DataType[]
  waermeData: DataType[]
  yearIndex: number
  years: Array<number>
}

export default function DesktopView({
  mode,
  stromData,
  waermeData,
  yearIndex,
  years,
}: DesktopViewProps) {
  return (
    <>
      <div className="flex h-full w-full justify-between gap-8">
        {Object.keys(buildings).map(building => (
          <div className="flex-1 p-2" key={building}>
            <div className="mx-auto mb-3 flex h-[200px] w-[200px] justify-center">
              {getBuildingIcon(building as keyof Building)}
            </div>
            <Title
              as="h4"
              className="min-h-[5rem] text-center"
              variant="building"
            >
              {buildings[building as keyof Building]}
            </Title>
          </div>
        ))}
      </div>
      {mode !== 'strom' && (
        <>
          <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
          <div className="flex h-full w-full justify-between gap-8">
            {Object.keys(buildings).map(building => (
              <div className="h-72 w-full md:pb-2" key={building}>
                <EnergyConsumptionChart
                  data={getData(
                    mode,
                    building as keyof Building,
                    stromData,
                    waermeData,
                    years[yearIndex],
                  )}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <LabelSeperator>
        {years[yearIndex] === new Date().getFullYear()
          ? 'Jahresverbrauch bisher'
          : 'Jahresverbrauch'}
      </LabelSeperator>
      <Spacer size={'sm'}></Spacer>
      <div className="flex h-full w-full justify-between gap-8">
        {Object.keys(buildings).map(building => {
          const sum = getYearSum(
            mode,
            building as keyof Building,
            stromData,
            waermeData,
            years[yearIndex],
          )

          return (
            <div
              className="flex w-full justify-center gap-1 p-2"
              key={building}
            >
              {sum === 0 ? (
                <Title as="h4" variant="building">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="building">
                    <AnimatedNumber decimals={0}>{sum}</AnimatedNumber>
                  </Title>
                  <Title as="h4" font="normal" variant="building">
                    kWh
                  </Title>
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
