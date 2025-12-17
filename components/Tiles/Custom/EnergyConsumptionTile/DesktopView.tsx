import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Spacer from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import EnergyConsumptionChart from './EnergyConsumptionChart'
import LabelSeperator from './LabelSeperator'
import { ViewProps } from './dt'
import IconFactory from '@/utils/factories/IconFactory'

export default function DesktopView({
  data,
  mode,
  variant,
  yearIndex,
  years,
}: ViewProps) {
  return (
    <>
      <div className="flex h-full w-full justify-between gap-8">
        {Object.entries(data).map(([id, row]) => (
          <div className="flex-1 p-2" key={id}>
            <div className="mx-auto mb-3 flex h-[200px] w-[200px] justify-center fill-primary">
              <IconFactory type={row.icon} variant={variant} />
            </div>
            <Title
              as="h4"
              className="min-h-[5rem] text-center"
              variant="primary"
            >
              {row.label}
            </Title>
          </div>
        ))}
      </div>
      {mode !== 'strom' && (
        <>
          <LabelSeperator>Monatlicher Verbrauch</LabelSeperator>
          <div className="flex h-full w-full justify-between gap-8">
            {Object.entries(data).map(([id, row]) => (
              <div className="h-72 w-full md:pb-2" key={id}>
                <EnergyConsumptionChart data={row.waerme.current} />
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
        {Object.entries(data).map(([id, row]) => {
          const entry = row[mode]

          return (
            <div className="flex w-full justify-center gap-1 p-2" key={id}>
              {entry.currentSum === 0 ? (
                <Title as="h4" variant="primary">
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant="primary">
                    <AnimatedNumber
                      decimals={0}
                      previous_value={entry.previousSum}
                    >
                      {entry.currentSum}
                    </AnimatedNumber>
                  </Title>
                  <Title as="h4" variant="primary">
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
