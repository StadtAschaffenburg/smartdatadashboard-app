'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { useEffect, useState } from 'react'
import MobileSlider from '@/components/Inputs/MobileSlider'
import Slider from '@/components/Inputs/Slider'
import IconPlaceholder from '@/components/Icons/Placeholder'
import { ContentProps, DataType } from './dt'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'

export default function TileContent({
  data,
  einpendler,
  auspendler,
  variant = 'economy',
}: ContentProps) {
  const [inCount, setInCount] = useState(0)
  const [outCount, setOutCount] = useState(0)
  const years: string[] = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  useEffect(() => {
    const row: DataType = data[yearIndex]

    setInCount(parseInt(row.einpendler.toString().replace(/\./g, ''), 10))
    setOutCount(parseInt(row.auspendler.toString().replace(/\./g, ''), 10))
  }, [data, yearIndex])

  const ratio = inCount > 0 ? outCount / inCount : 0
  const icon_width_in = Math.min(50 + (1 / ratio) * 25, 100)
  const icon_width_out = Math.min(50 + ratio * 25, 100)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5">{einpendler}</Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {inCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5">{auspendler}</Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {outCount}
          </AnimatedNumber>
        </div>
      </div>
      <div className="grid h-60 w-full grid-cols-2 items-center rounded p-4">
        <div className="flex w-full justify-center">
          <IconPlaceholder
            className={cx(
              IconStyle({ variant }),
              'w-full max-w-60 transition-all',
            )}
            style={{
              width: `${icon_width_in}%`,
            }}
          />
        </div>
        <div className="flex w-full justify-center">
          <IconPlaceholder
            className={cx(
              IconStyle({ variant }),
              'w-full max-w-60 transition-all',
            )}
            style={{
              width: `${icon_width_out}%`,
            }}
          />
        </div>
      </div>
      <MobileSlider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={variant}
      />
      <Slider
        className={'hidden xl:block'}
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={variant}
      />
      <Spacer />
    </div>
  )
}
