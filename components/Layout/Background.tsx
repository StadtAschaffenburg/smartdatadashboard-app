import {
  BackgroundDefaultVariants,
  BackgroundVariant,
  getVariantClass,
} from '@/utils/variants/BackgroundVariants'

export type BackgroundProps = {
  light?: boolean
  variant?: BackgroundVariant
  children: React.ReactNode
}

// Background-Komponente ohne cva
export default function Background({
  light = false,
  variant = BackgroundDefaultVariants.variant,
  children,
}: BackgroundProps) {
  const background_class = getVariantClass(variant, light)

  return <div className={background_class}>{children}</div>
}
