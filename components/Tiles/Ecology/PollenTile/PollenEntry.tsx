import Title from '@/components/Elements/Title'
import {
  IconLuftqualitaetMittel,
  IconLuftqualitaetNegativ,
  IconLuftqualitaetPositiv,
} from '@/components/Icons/Ecology'

export type PollenEntryProps = {
  value: string
  title: string
  integer: number
}

const qualityToIcon = (quality: number) => {
  if (quality <= 1) {
    return IconLuftqualitaetPositiv
  }
  if (quality <= 2) {
    return IconLuftqualitaetMittel
  }
  return IconLuftqualitaetNegativ
}

export default function PollenEntry({
  value,
  integer,
  title,
}: PollenEntryProps) {
  const Icon = qualityToIcon(integer)

  return (
    <div className="my-1 flex items-center gap-3 md:my-2">
      <Icon className={'fill-live aspect-square h-10 md:h-14'} />
      <div>
        <Title as={'h4'} tag={'span'}>
          {title}
        </Title>
        <Title as={'h6'} tag={'span'} variant={'live'}>
          {value}
        </Title>
      </div>
    </div>
  )
}
