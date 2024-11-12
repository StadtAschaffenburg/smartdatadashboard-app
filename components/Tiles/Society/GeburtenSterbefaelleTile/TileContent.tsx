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
  geburten,
  sterbefaelle,
  variant = 'society',
}: ContentProps) {
  const [birthCount, setBirthCount] = useState(0)
  const [deadCount, setDeadCount] = useState(0)
  const years: string[] = data.map(e => e.ZEIT.toString())
  const [yearIndex, setYearIndex] = useState(data.length - 1)

  useEffect(() => {
    const row: DataType = data[yearIndex]

    setBirthCount(parseInt(row.geburten.toString().replace(/\./g, ''), 10))
    setDeadCount(parseInt(row.sterbefaelle.toString().replace(/\./g, ''), 10))
  }, [data, yearIndex])

  const ratio = birthCount > 0 ? deadCount / birthCount : 0
  const icon_width_birth = Math.min(50 + (1 / ratio) * 25, 100)
  const icon_width_dead = Math.min(50 + ratio * 25, 100)

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title as="h5">{geburten}</Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {birthCount}
          </AnimatedNumber>
        </div>
        <div className="flex flex-col items-end">
          <Title as="h5">{sterbefaelle}</Title>
          <AnimatedNumber className="text-2xl" variant={variant}>
            {deadCount}
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
              width: `${icon_width_birth}%`,
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
              width: `${icon_width_dead}%`,
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
