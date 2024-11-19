import {
  BackgroundDefaultVariants,
  BackgroundVariant,
  getVariantClass,
} from '@/utils/variants/BackgroundVariants'
import { cx } from 'class-variance-authority'

export type BackgroundProps = {
  light?: boolean
  variant?: BackgroundVariant
  children: React.ReactNode
  className?: string
  rounded?: boolean
}

// Background-Komponente ohne cva
export default function Background({
  light = false,
  variant = BackgroundDefaultVariants.variant,
  children,
  className,
  rounded = false,
}: BackgroundProps) {
  return (
    <div
      className={cx(
        className,
        getVariantClass(variant, light),
        rounded && 'rounded',
      )}
    >
      {children}
    </div>
  )
}
