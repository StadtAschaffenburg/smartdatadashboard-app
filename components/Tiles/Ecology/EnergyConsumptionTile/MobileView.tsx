import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'

import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import Carousel from '@/components/Elements/Carousel'
import { Building, DataType } from './dt'
import { buildingIcon } from './icons'
import { buildings } from './buildings'

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
    d => year === new Date(d.datum).getFullYear(),
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

interface MobileViewProps {
  mode: 'strom' | 'waerme'
  stromData: DataType[]
  waermeData: DataType[]
  yearIndex: number
  years: Array<number>
}

export default function MobileView({
  mode,
  stromData,
  waermeData,
  yearIndex,
  years,
}: MobileViewProps) {
  return (
    <Carousel
      arrows
      options={{
        gap: '4rem',
      }}
      pagination
    >
      {Object.keys(buildings).map(building => {
        const sum = getYearSum(
          mode,
          building as keyof Building,
          stromData,
          waermeData,
          years[yearIndex],
        )

        return (
          <div key={building}>
            <div className="flex gap-2">
              <Title as="h4" className="h-20 flex-1" variant="ecology">
                {buildings[building as keyof Building]}
              </Title>
              <div className="mx-auto flex h-[80px] w-[80px] justify-end fill-ecology">
                {getBuildingIcon(building as keyof Building)}
              </div>
            </div>
            {mode !== 'strom' && (
              <>
                <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
                <div className="h-40 w-full">
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
              </>
            )}
            <LabelSeperator>
              {years[yearIndex] === new Date().getFullYear()
                ? 'Jahresverbrauch bisher'
                : 'Jahresverbrauch'}
            </LabelSeperator>
            <div className="flex w-full gap-1 p-2">
              {sum === 0 ? (
                <Title as="h4" variant="ecology">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="ecology">
                    <AnimatedNumber decimals={0}>{sum}</AnimatedNumber>
                  </Title>
                  <Title as="h4" font="normal" variant="ecology">
                    kWh
                  </Title>
                </>
              )}
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}
