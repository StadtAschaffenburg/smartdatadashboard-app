import { cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, HTMLAttributes, JSX, SVGProps } from 'react'
import { IconStyle } from '@/utils/variants/IconVariants'

interface IconFactoryProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof IconStyle> {
  icon:
    | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
    | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
}

export default function IconFactory({
  icon,
  variant,
  className,
}: IconFactoryProps) {
  const Icon = icon

  return <Icon className={cx(IconStyle({ variant }), className)} />
}
