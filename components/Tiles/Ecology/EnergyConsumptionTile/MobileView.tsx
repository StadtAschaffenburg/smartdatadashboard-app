import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { SVGProps } from 'react'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import Carousel from '@/components/Elements/Carousel'
import { buildings, BuildingType, ViewProps } from './dt'
import { buildingIcon } from './icons'

function getBuildingIcon(
  building: keyof BuildingType,
  props?: SVGProps<SVGSVGElement>,
) {
  const Icon = buildingIcon[building]
  return <Icon {...props} />
}

export default function MobileView({
  data,
  mode,
  yearIndex,
  years,
}: ViewProps) {
  return (
    <Carousel
      arrows
      options={{
        gap: '4rem',
      }}
      pagination
    >
      {Object.keys(buildings).map(index => {
        const building = index as keyof BuildingType
        const entry = data[building]

        return (
          <div key={building}>
            <div className="flex gap-2">
              <Title as="h4" className="h-20 flex-1" variant="ecology">
                {buildings[building]}
              </Title>
              <div className="mx-auto flex h-[80px] w-[80px] justify-end fill-ecology">
                {getBuildingIcon(building)}
              </div>
            </div>
            {mode !== 'strom' && (
              <>
                <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
                <div className="h-40 w-full">
                  <EnergyConsumptionChart data={entry.waerme.current} />
                </div>
              </>
            )}
            <LabelSeperator>
              {years[yearIndex] === new Date().getFullYear()
                ? 'Jahresverbrauch bisher'
                : 'Jahresverbrauch'}
            </LabelSeperator>
            <div className="flex w-full gap-1 p-2">
              {entry[mode].currentSum === 0 ? (
                <Title as="h4" variant="ecology">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="ecology">
                    <AnimatedNumber
                      decimals={0}
                      previous_value={entry[mode].previousSum}
                    >
                      {entry[mode].currentSum}
                    </AnimatedNumber>
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
