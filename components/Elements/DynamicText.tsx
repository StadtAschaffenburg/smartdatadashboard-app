import React from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { TilePayloadType } from '@/types/tiles'
import { getDataPoint, getVariantType } from '@/utils/payload'

interface DynamicTextProps {
  children: string
  tile_payload: TilePayloadType
}

export default function DynamicText({
  children,
  tile_payload,
}: DynamicTextProps) {
  const parts = children.split(/\[animate:([a-zA-Z0-9_]+)\]/g)
  const variant = getVariantType(tile_payload)

  return (
    <>
      {parts.map((part, index) => {
        const data_point = getDataPoint(tile_payload, part)

        if (data_point) {
          return (
            <AnimatedNumber key={index} variant={variant}>
              {data_point}
            </AnimatedNumber>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </>
  )
}
