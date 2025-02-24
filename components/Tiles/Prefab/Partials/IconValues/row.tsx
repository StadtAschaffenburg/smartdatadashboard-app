'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import IconFactory from '@/utils/IconFactory'
import { RowDataType } from '@/utils/sources'
import { TileVariantTypes } from '@/utils/payload'

interface RowType {
  data: RowDataType
  variant?: TileVariantTypes
  single?: boolean
}

export default function Row({ data, single = false, variant }: RowType) {
  return (
    <div className="flex items-center gap-4">
      {data.icon && (
        <div className="aspect-square w-16 min-w-16 py-2">
          <IconFactory
            className={'h-full w-full object-contain'}
            type={data.icon}
            variant={variant}
          />
        </div>
      )}
      <Title as={'h4'} variant={variant}>
        <span>{data.label}:</span> {single && <br />}
        <AnimatedNumber
          className={
            single
              ? 'sm:text-xl block pt-1 text-lg md:text-2xl'
              : 'inline-block min-w-32'
          }
          decimals={data.decimals}
          previous_value={data.previous}
          unit={data.unit}
        >
          {data.current}
        </AnimatedNumber>{' '}
      </Title>
    </div>
  )
}
