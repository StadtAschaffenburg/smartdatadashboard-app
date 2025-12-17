import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

export function getThemeColor(
  variant: string = 'primary',
  shade: string = 'DEFAULT',
): string {
  const { theme } = resolveConfig(tailwindConfig)
  // @ts-ignore
  const defaultColor = theme?.colors.primary?.DEFAULT 
  // @ts-ignore
  return theme?.colors[variant]?.[shade] || defaultColor
}
