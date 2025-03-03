import Layout from '../(main)/layout'
import Container from '@/components/Layout/Container'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default async function NotFound() {
  return (
    <Layout>
      <Container>
        <Title as="h1" className="mb-4" font="normal" variant="primary">
          Sie sind offline
        </Title>
        <Text>
          <p>
            Diese Web-App funktioniert nur, solange Sie mit dem Internet
            verbunden sind.
          </p>
        </Text>
      </Container>
    </Layout>
  )
}
