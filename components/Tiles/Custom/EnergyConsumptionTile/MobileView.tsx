import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import Carousel from '@/components/Elements/Carousel'
import { ViewProps } from './dt'
import IconFactory from '@/utils/factories/IconFactory'

export default function MobileView({
  data,
  mode,
  variant,
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
      {Object.entries(data).map(([id, row]) => {
        return (
          <div key={id}>
            <div className="flex gap-2">
              <Text as="h4" className="h-20 flex-1" variant={variant} weight="medium">
                {row.label}
              </Text>
              <div className="mx-auto flex h-[80px] w-[80px] justify-end fill-ecology">
                <IconFactory type={row.icon} variant={variant} />
              </div>
            </div>
            {mode !== 'strom' && (
              <>
                <LabelSeperator variant={variant}>Monatlicher Verbrauch</LabelSeperator>
                <div className="h-40 w-full">
                  <EnergyConsumptionChart data={row.waerme.current} />
                </div>
              </>
            )}
            <LabelSeperator variant={variant}>
              {years[yearIndex] === new Date().getFullYear()
                ? 'Jahresverbrauch bisher'
                : 'Jahresverbrauch'}
            </LabelSeperator>
            <div className="flex w-full gap-1 p-2">
              {row[mode].currentSum === 0 ? (
                <Text as="h4" variant="primary">
                  fehlende Daten
                </Text>
              ) : (
                <>
                  <Text as="h4" variant={variant}>
                    <AnimatedNumber
                      decimals={0}
                      previous_value={row[mode].previousSum}
                      unit={'kWh'}
                    >
                      {row[mode].currentSum}
                    </AnimatedNumber>
                  </Text>
                </>
              )}
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}
