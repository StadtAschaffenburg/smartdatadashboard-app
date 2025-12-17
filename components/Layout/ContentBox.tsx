import Title from '@/components/Elements/Title'
import {
  BorderVariants,
  BorderVariantType,
} from '@/utils/variants/BorderVariants'
import { cva } from 'class-variance-authority'
import { cx } from 'class-variance-authority'

export type BackgroundProps = {
  variant?: BorderVariantType
  children: React.ReactNode
  title?: string | null
}

const BoxStyle = cva(
  'flex h-full w-full flex-col justify-between gap-8 border-b-8 bg-white px-6 py-4 xs:p-8 lg:px-8 lg:pt-6 lg:pb-5 xl:px-12 xl:pt-10 xl:pb-9 rounded-intangible',
  {
    variants: BorderVariants,
    defaultVariants: { variant: 'ivory' },
  },
)

export default function ContentBox({
  className,
  children,
  title,
  variant,
}: BackgroundProps & { className?: string }) {
  return (
    <div className={cx(BoxStyle({ variant }), className)}>
      {title && <Title as="h1">{title}</Title>}
      {children}
    </div>
  )
}
