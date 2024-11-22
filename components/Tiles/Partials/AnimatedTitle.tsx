import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'

export default function AnimatedTitle({
  count,
  title,
}: {
  count: number
  title: string
}) {
  // check if "[count]" exists in the title
  const hasCountPlaceholder = title.includes('[count]')

  if (hasCountPlaceholder) {
    // replace "[count]" with <AnimatedNumber>
    const parts = title.split('[count]')
    return (
      <span>
        {parts[0]}
        <AnimatedNumber>{count ?? 0}</AnimatedNumber>
        {parts[1]}
      </span>
    )
  }

  // if "[count]" is not in the title, prepend <AnimatedNumber> to the title
  return (
    <span>
      <AnimatedNumber>{count ?? 0}</AnimatedNumber> {title}
    </span>
  )
}
