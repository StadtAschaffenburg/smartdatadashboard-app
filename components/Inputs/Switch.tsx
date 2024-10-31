import * as SwitchPrimitive from '@radix-ui/react-switch'
import { useState } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Title from '../Elements/Title'
import {
  SwitchDefaultVariants,
  SwitchVariants,
} from '@/utils/variants/SwitchVariants'

const switchThumbStyle = cva(
  'flex h-3 w-3 md:h-5 md:w-5 items-center justify-center rounded-full transition-all',
  {
    variants: SwitchVariants,
    defaultVariants: SwitchDefaultVariants,
  },
)

const switchThumbInnerStyle = cva(
  'h-[10px] w-[10px] md:h-4 md:w-4 rounded-full bg-white transition-opacity',
  {
    variants: {
      checked: {
        false: 'opacity-100',
        true: 'opacity-0',
      },
    },
  },
)

const switchBorderStyle = cva(
  'w-[2.25rem] md:w-[3.25rem] p-1 rounded-full bg-white border-[1px] md:border-2 shadow-inner',
  {
    variants: SwitchVariants,
    defaultVariants: SwitchDefaultVariants,
  },
)

type SwitchProps = SwitchPrimitive.SwitchProps &
  VariantProps<typeof switchBorderStyle> & {
    label?: string
  }

export default function Switch({ label, variant, ...props }: SwitchProps) {
  const [checked, setChecked] = useState(props.defaultChecked)

  return (
    <div className="flex items-center space-x-4">
      <SwitchPrimitive.Root
        className={switchBorderStyle({ variant })}
        {...props}
        onCheckedChange={val => {
          if (props.onCheckedChange) {
            props.onCheckedChange(val)
          }
          setChecked(val)
        }}
      >
        <SwitchPrimitive.Thumb asChild>
          <div className={switchThumbStyle({ variant, checked })}>
            <div className={switchThumbInnerStyle({ checked })} />
          </div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && (
        <Title as={'h5'} variant={'primary'}>
          {label}
        </Title>
      )}
    </div>
  )
}
