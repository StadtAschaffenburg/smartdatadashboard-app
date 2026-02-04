import Text from '@/components/Elements/Text'
import { TileVariantTypes } from '@/utils/variants/TileVariants'

interface Props {
  children: string
  variant?: TileVariantTypes
}

export default function LabelSeperator({ children, variant = 'primary' }: Props) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex-none">
        <Text as={'h5'} className="w-fit" variant={variant}>
          {children}
        </Text>
      </div>
      <hr className="flex-1 border-[#707070]" />
    </div>
  )
}
