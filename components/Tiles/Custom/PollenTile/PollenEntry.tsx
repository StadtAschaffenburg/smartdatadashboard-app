import Text from '@/components/Elements/Text'
import {
  IconLuftqualitaetMittel,
  IconLuftqualitaetNegativ,
  IconLuftqualitaetPositiv,
} from '@/components/Icons/Airquality'

export type PollenEntryProps = {
  value: number
  title: string
}

const ratingStrings: { [key: number]: string } = {
  0: 'keine',
  1: 'keine bis gering',
  2: 'gering',
  3: 'gering bis mittel',
  4: 'mittel',
  5: 'mittel bis hoch',
  6: 'hoch',
}

function getRatingStrings(value: number): string {
  return (
    ratingStrings[value] || ratingStrings[Object.keys(ratingStrings).length - 1]
  )
}

const qualityToIcon = (quality: number) => {
  if (quality <= 2) {
    return IconLuftqualitaetPositiv
  }
  if (quality <= 4) {
    return IconLuftqualitaetMittel
  }
  return IconLuftqualitaetNegativ
}

export default function PollenEntry({ value, title }: PollenEntryProps) {
  const Icon = qualityToIcon(value)
  const rating = getRatingStrings(value)

  return (
    <div className="my-1 flex items-center gap-3 md:my-2">
      <Icon className={'aspect-square h-10 fill-live md:h-14'} />
      <div>
        <Text as={'h4'} tag={'span'}>
          {title}
        </Text>
        <Text as={'h6'} tag={'span'} variant={'primary'}>
          {rating}
        </Text>
      </div>
    </div>
  )
}
