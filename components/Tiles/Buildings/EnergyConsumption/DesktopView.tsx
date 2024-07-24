import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'

import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'

// @ts-ignore
import waermeDataTable from '@/assets/data/waerme.csv'

// @ts-ignore
import stromDataTable from '@/assets/data/strom.csv'

import {
  MsKlimadashboardIconsGBibliothek,
  MsKlimadashboardIconsGSchule,
  MsKlimadashboardIconsGSportSentruperHoehe,
  MsKlimadashboardIconsGStadtweinhaus,
} from '@/components/Icons/Gebaeude'

type InputDataType = {
  Zeit: string
  'Brentanoschule (kWh)': string
  'Stadbibliothek (kWh)': string
  'F.A.N Frankenstolz Arena (kWh)': string
  'Rathaus (kWh)': string
}

type DataType = {
  Datum: number
  brentanoschule: number | null
  stadtbibliothek: number | null
  frankenstolz_arena: number | null
  rathaus: number | null
}

const convertToFloat = (str: string): number =>
  parseFloat(str.replace(/\./g, '').replace(',', '.'))

const monthMap: { [key: string]: number } = {
  Jan: 0,
  Feb: 1,
  Mär: 2,
  Apr: 3,
  Mai: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Dez: 11,
}

const convertToUnixTimestamp = (dateStr: string): number => {
  if (/^\d{4}$/.test(dateStr)) {
    // Check if the dateStr is just a year
    const date = new Date(`${dateStr}-01-01T00:00:00Z`)
    return Math.floor(date.getTime() / 1000)
  }
  const [monthStr, yearStr] = dateStr.split(' ')
  const month = monthMap[monthStr]
  const year = parseInt(`20${yearStr}`, 10) // Assumes the year is in the 21st century
  const date = new Date(year, month, 1) // Month in Date object is 0-based
  return Math.floor(date.getTime() / 1000)
}

const stromData: DataType[] = stromDataTable.map((d: InputDataType) => ({
  Datum: convertToUnixTimestamp(d.Zeit) * 1000,
  brentanoschule: convertToFloat(d['Brentanoschule (kWh)']),
  stadtbibliothek: convertToFloat(d['Stadbibliothek (kWh)']),
  frankenstolz_arena: convertToFloat(d['F.A.N Frankenstolz Arena (kWh)']),
  rathaus: convertToFloat(d['Rathaus (kWh)']),
}))

const waermeData: DataType[] = waermeDataTable.map((d: InputDataType) => ({
  Datum: convertToUnixTimestamp(d.Zeit) * 1000,
  brentanoschule: convertToFloat(d['Brentanoschule (kWh)']),
  stadtbibliothek: convertToFloat(d['Stadbibliothek (kWh)']),
  frankenstolz_arena: convertToFloat(d['F.A.N Frankenstolz Arena (kWh)']),
  rathaus: convertToFloat(d['Rathaus (kWh)']),
}))

type Building = Omit<DataType, 'Datum'>

const buildings: Record<keyof Building, string> = {
  brentanoschule: 'Bentanoschule',
  stadtbibliothek: 'Stadtbibliothek',
  frankenstolz_arena: 'F.A.N Frankenstolz Arena',
  rathaus: 'Rathaus',
}

const buildingIcon: Record<
  keyof Building,
  (_props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  brentanoschule: MsKlimadashboardIconsGBibliothek,
  stadtbibliothek: MsKlimadashboardIconsGSportSentruperHoehe,
  frankenstolz_arena: MsKlimadashboardIconsGSchule,
  rathaus: MsKlimadashboardIconsGStadtweinhaus,
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
  year: number,
) {
  const data = getData(mode, building, year)

  return data.reduce((a, b) => a + b, 0)
}

const years = Array.from(
  new Set(
    stromData.map(d => new Date(d.Datum).getFullYear()).filter(e => e > 2018),
  ),
).sort((a, b) => a - b)

interface DesktopViewProps {
  mode: 'strom' | 'waerme'
  yearIndex: number
}

export default function DesktopView({ mode, yearIndex }: DesktopViewProps) {
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
