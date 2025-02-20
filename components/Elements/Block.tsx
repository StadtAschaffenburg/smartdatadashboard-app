import Text from '@/components/Elements/Text'

export default function Block({ text }: { text: string }) {
  return (
    <Text as="md" variant={'dark'}>
      {text.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Text>
  )
}
