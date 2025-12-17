import React from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { getVariantType } from '@/utils/payload'
import { sanitizeNumber, TilePayloadType } from '@schleegleixner/react-statamic-api'

interface DynamicTextProps {
  className?: string
  children: string
  tile_payload: TilePayloadType
}

export default function DynamicText({ children, tile_payload, className }: DynamicTextProps) {
  const variant = getVariantType(tile_payload)
  const parts = children.split(/\[animate:\s*([0-9.,]+)\]/g)

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1 && !isNaN(sanitizeNumber(part))) {
          return (
            <AnimatedNumber key={index} variant={variant}>
              {sanitizeNumber(part)}
            </AnimatedNumber>
          )
        }
        return <span className={className} key={index}>{part}</span>
      })}
    </>
  )
}
