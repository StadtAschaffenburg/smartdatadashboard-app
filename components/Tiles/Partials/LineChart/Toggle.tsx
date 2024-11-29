import Switch from '@/components/Inputs/Switch'
import { InstitutionIndices } from './dt'
import Text from '@/components/Elements/Text'
import { IconStyle } from '@/utils/variants/IconVariants'
import { cx } from 'class-variance-authority'

export default function Toggle({
  indices,
  type,
  defaultChecked,
  onChange,
}: {
  indices: InstitutionIndices
  type: string
  defaultChecked?: boolean
  onChange?: (_checked: boolean) => void
}) {
  const Icon = indices[type].icon ?? (() => <></>)
  const variant = indices[type].variant

  return (
    <div className="flex w-full flex-row-reverse items-center justify-between gap-2 lg:flex-row lg:justify-normal lg:gap-4">
      <Switch
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        variant={variant}
      />
      <div className="flex items-center gap-2 md:w-max md:gap-4">
        <Icon
          className={cx(IconStyle({ variant }), 'aspect-square h-5 md:h-8')}
        />
        <Text as="h5" variant={variant}>
          {indices[type].title}
        </Text>
      </div>
    </div>
  )
}
