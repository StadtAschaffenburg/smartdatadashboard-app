import Switch from '@/components/Inputs/Switch'
import Text from '@/components/Elements/Text'
import IconFactory from '@/utils/factories/IconFactory'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

interface ToggleProps {
  disabled?: boolean
  icon: string | React.ComponentType<any> | null | undefined
  variant: TileVariantTypes
  type: string
  checked?: boolean
  onChange?: (_checked: boolean) => void
  title: string
}

export default function Toggle({
  disabled,
  icon,
  variant,
  checked,
  onChange,
  title,
}: ToggleProps) {
  const IconComponent =
    icon && typeof icon !== 'string' ? (icon as React.ComponentType<any>) : null
  const icon_classes = 'h-full w-full object-contain'

  return (
    <div className="mx-auto flex min-h-8 w-full max-w-80 flex-row items-center justify-normal gap-4 lg:min-h-12">
      <Switch
        aria_label={title}
        defaultChecked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        variant={variant}
      />
      <div className="flex items-center gap-2 md:w-max md:gap-4">
        <div className="aspect-square h-5 md:h-8">
          {icon && typeof icon === 'string' && (
            <IconFactory
              className={icon_classes}
              type={icon}
              variant={variant}
            />
          )}
          {IconComponent && <IconComponent className={icon_classes} />}
        </div>

        <Text className="text-lg leading-tight" variant={variant}>
          {title}
        </Text>
      </div>
    </div>
  )
}
