'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { IconOepnvBus, IconOepnvGast } from '@/components/Icons/Oepnv'
import { useEffect, useState } from 'react'
import { DataValue, PassengerContentProps } from './dt'
import Slider from '@/components/Inputs/Slider/'
import { getVariantType } from '@/utils/payload'
import { getDataSource } from '@schleegleixner/react-statamic-api'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function PassengerContent({
  tile_payload,
}: PassengerContentProps) {
  const datasource = getDataSource(tile_payload)
  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )
  const [passengerValue, setPassengerValue] = useState<DataValue>({
    current: 0,
    previous: null,
  })

  useEffect(() => {
    if (!datasource) {
      return
    }

    const current = datasource.content[yearIndex]
    const previous = yearIndex > 0 ? datasource.content[yearIndex - 1] : null

    setPassengerValue({
      current: current.value / 1000000,
      previous: previous ? previous.value / 1000000 : null,
    })
  }, [yearIndex, datasource])

  if (!datasource) {
    return <RequestIndicator />
  }

  const variant = getVariantType(tile_payload)

  const renderPassengerIcons = (count: number) => {
    const maxIcons = 10
    const integerPart = Math.floor(count) // Ganze Anzahl an vollen Icons
    const fractionalPart = count % 1 // Bruchteil für das letzte Icon
    const totalIcons = Math.min(integerPart, maxIcons) // Maximale Anzahl der vollen Icons

    return Array.from(
      {
        length:
          totalIcons + (fractionalPart > 0 && totalIcons < maxIcons ? 1 : 0),
      },
      (_, i) => {
        const isLastIcon =
          i === totalIcons && fractionalPart > 0 && totalIcons < maxIcons
        return (
          <span className="flex items-center justify-center" key={`icon-${i}`}>
            <IconOepnvGast
              className="h-8 lg:h-10"
              style={
                isLastIcon
                  ? {
                      transform: `scale(${fractionalPart})`,
                      transformOrigin: 'center',
                    }
                  : undefined
              }
            />
          </span>
        )
      },
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-row gap-6">
        <span>
          <IconOepnvBus className="h-20 fill-mosque md:h-32" />
        </span>
        <div className="flex flex-grow flex-col justify-between">
          <Title as="h3" variant={variant}>
            <AnimatedNumber
              decimals={2}
              previous_value={passengerValue.previous}
            >
              {passengerValue.current}
            </AnimatedNumber>{' '}
            Mio
          </Title>
          <div className="flex flex-row-reverse justify-start gap-1 fill-mosque pb-4">
            {renderPassengerIcons(passengerValue.current)}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Slider
          labels={datasource.timeline}
          onValueChange={setYearIndex}
          variant={variant}
        />
      </div>
    </div>
  )
}
