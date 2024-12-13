'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import IconFactory from '@/utils/IconFactory'
import { RowDataType } from '@/utils/sources'
import { TileVariants } from '@/utils/variants/TileVariants'

interface RowType {
  data: RowDataType
  variant?: keyof typeof TileVariants.variant
  single?: boolean
}

export default function Row({ data, single = false, variant }: RowType) {
  return (
    <div className="flex items-center gap-4">
      {data.icon && (
        <IconFactory
          className={'h-16 w-16 py-2'}
          type={data.icon}
          variant={variant}
        />
      )}
      <Title as={'h4'} variant={variant}>
        <span>{data.label}:</span> {single && <br />}
        <AnimatedNumber
          className={single ? 'block pt-1 text-2xl' : ''}
          decimals={0}
          previous_value={data.previous}
          unit={data.unit}
        >
          {data.current}
        </AnimatedNumber>{' '}
      </Title>
    </div>
  )
}
