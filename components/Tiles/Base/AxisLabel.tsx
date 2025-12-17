import Text from '@/components/Elements/Text'

export default function AxisLabel({
  children = null,
}: {
  children?: string | null
}) {
  if (!children) {
    return <></>
  }

  return (
    <Text as="h7" bold className="mb-1">
      {children}
    </Text>
  )
}
