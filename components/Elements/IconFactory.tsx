import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, HTMLAttributes, SVGProps } from 'react'

interface IconFactoryProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconStyle> {
  icon:
    | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
    | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
}

const iconStyle = cva('', {
  variants: {
    variant: {
      primary: 'stroke-primary text-primary',
      mobility: 'stroke-mobility text-mobility',
      successStory: 'stroke-secondary text-secondary',
      climate: 'stroke-climate text-climate',
      eistage: 'stroke-climate text-climate',
      frosttage: 'stroke-primary text-primary',
      heisse_tage: 'stroke-energy text-energy',
      sommertage: 'stroke-mobility text-mobility',
      tropennaechte: 'stroke-buildings text-buildings',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export default function IconFactory({
  icon,
  variant,
  className,
}: IconFactoryProps) {
  const Icon = icon

  return <Icon className={cx(iconStyle({ variant }), className)} />
}
