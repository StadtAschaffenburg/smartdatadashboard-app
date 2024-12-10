import Layout from './(main)/layout'
import Container from '@/components/Layout/Container'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default async function NotFound() {
  return (
    <Layout>
      <Container>
        <Title as="h1" className="mb-4" font="normal" variant="primary">
          Seite nicht gefunden
        </Title>
        <Text>
          <p className="mb-2">
            Die von Ihnen aufgerufene Seite konnte nicht gefunden werden.
          </p>
          <p>
            Zurück zur{' '}
            <a className="underline" href="/">
              Startseite
            </a>
          </p>
        </Text>
      </Container>
    </Layout>
  )
}
