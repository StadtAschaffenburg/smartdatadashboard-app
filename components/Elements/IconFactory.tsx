import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, HTMLAttributes, SVGProps } from 'react'
import {
  IconDefaultVariants,
  IconVariants,
} from '@/utils/variants/IconVariants'

interface IconFactoryProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconStyle> {
  icon:
    | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
    | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
}

const iconStyle = cva('', {
  variants: IconVariants,
  defaultVariants: IconDefaultVariants,
})

export default function IconFactory({
  icon,
  variant,
  className,
}: IconFactoryProps) {
  const Icon = icon

  return <Icon className={cx(iconStyle({ variant }), className)} />
}
