import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Spacer from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
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
  console.log('data', data)
  return (
    <>
      <div className="flex h-full w-full justify-between gap-8">
        {Object.entries(data).map(([id, row]) => (
          <div className="flex-1 p-2" key={id}>
            <div className="mx-auto mb-3 flex h-[200px] w-[200px] justify-center fill-primary">
              <IconFactory type={row.icon} variant={variant} />
            </div>
            <Text
              as="h4"
              className="min-h-[5rem] text-center"
              weight="medium"
              variant={variant}
            >
              {row.label}
            </Text>
          </div>
        ))}
      </div>

      {mode !== 'strom' && (
        <>
          <LabelSeperator variant={variant}>Monatlicher Verbrauch</LabelSeperator>
          <div className="flex h-full w-full justify-between gap-8">
            {Object.entries(data).map(([id, row]) => (
              <div className="h-72 w-full md:pb-2" key={id}>
                <EnergyConsumptionChart data={row.waerme.current} />
              </div>
            ))}
          </div>
        </>
      )}

      <LabelSeperator variant={variant}>
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
                <Title as="h4" variant={variant}>
                  fehlende Daten
                </Title>
              ) : (
                <>
                  <Title as="h4" variant={variant}>
                    <AnimatedNumber
                      decimals={0}
                      previous_value={entry.previousSum}
                      unit={'kWh'}
                    >
                      {entry.currentSum}
                    </AnimatedNumber>
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
