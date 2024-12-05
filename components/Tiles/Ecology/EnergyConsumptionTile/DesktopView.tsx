import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import { buildings, BuildingType, ViewProps } from './dt'
import { buildingIcon } from './icons'

function getBuildingIcon(
  building: keyof BuildingType,
  props?: SVGProps<SVGSVGElement>,
) {
  const Icon = buildingIcon[building]
  return <Icon {...props} />
}

export default function DesktopView({
  data,
  mode,
  yearIndex,
  years,
}: ViewProps) {
  return (
    <>
      <div className="flex h-full w-full justify-between gap-8">
        {Object.keys(buildings).map(building => (
          <div className="flex-1 p-2" key={building}>
            <div className="mx-auto mb-3 flex h-[200px] w-[200px] justify-center fill-ecology">
              {getBuildingIcon(building as keyof BuildingType)}
            </div>
            <Title
              as="h4"
              className="min-h-[5rem] text-center"
              variant="ecology"
            >
              {buildings[building as keyof BuildingType]}
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
                  data={data[building as keyof BuildingType].waerme.current}
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
          const entry = data[building as keyof BuildingType][mode]

          return (
            <div
              className="flex w-full justify-center gap-1 p-2"
              key={building}
            >
              {entry.currentSum === 0 ? (
                <Title as="h4" variant="ecology">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="ecology">
                    <AnimatedNumber
                      decimals={0}
                      previous_value={entry.previousSum}
                    >
                      {entry.currentSum}
                    </AnimatedNumber>
                  </Title>
                  <Title as="h4" font="normal" variant="ecology">
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
