import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const TitleStyle = cva('block', {
  variants: {
    as: {
      h1: 'text-[40px] lg:text-[80px] lg:leading-[5.5rem]',
      h2: 'text-[30px] lg:text-[50px] lg:leading-[3.5rem] lg:tracking-tight',
      h3: 'text-[30px] lg:text-[40px] lg:leading-[3rem]',
      h4: 'text-[20px] lg:text-3xl lg:leading-[36px]',
      h5: 'text-base lg:text-xl lg:leading-6 lg:tracking-wide',
      h6: 'text-base lg:text-lg lg:tracking-wide',
      h7: 'text-base leading-7 tracking-wide',
      h8: 'text-sm leading-5 tracking-wide',
      subtitle: 'text-xl lg:text-3xl',
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
      inverse: 'text-white',
      dark: 'text-zinc-900',
      eistage: 'text-climate',
      frosttage: 'text-primary',
      heisse_tage: 'text-energy',
      sommertage: 'text-mobility',
      tropennaechte: 'text-buildings',
    },
    font: {
      medium: 'font-medium',
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    font: 'medium',
  },
})

type TitleProps = VariantProps<typeof TitleStyle> &
  HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  font,
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <span
      {...props}
      className={cx(TitleStyle({ as, variant, font }), className)}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </span>
  )
}
