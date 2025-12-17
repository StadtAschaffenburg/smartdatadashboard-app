import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
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
              <Title as="h4" className="h-20 flex-1" variant="primary">
                {row.label}
              </Title>
              <div className="mx-auto flex h-[80px] w-[80px] justify-end fill-primary">
                <IconFactory type={row.icon} variant={variant} />
              </div>
            </div>
            {mode !== 'strom' && (
              <>
                <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
                <div className="h-40 w-full">
                  <EnergyConsumptionChart data={row.waerme.current} />
                </div>
              </>
            )}
            <LabelSeperator>
              {years[yearIndex] === new Date().getFullYear()
                ? 'Jahresverbrauch bisher'
                : 'Jahresverbrauch'}
            </LabelSeperator>
            <div className="flex w-full gap-1 p-2">
              {row[mode].currentSum === 0 ? (
                <Title as="h4" variant="primary">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="primary">
                    <AnimatedNumber
                      decimals={0}
                      previous_value={row[mode].previousSum}
                    >
                      {row[mode].currentSum}
                    </AnimatedNumber>
                  </Title>
                  <Title as="h4" variant="primary">
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
