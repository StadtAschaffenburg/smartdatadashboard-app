import Container from '@/components/Layout/Container'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import Link from 'next/link'

export default async function NotFound() {
  return (
      <Container>
        <Title as="h1" className="mb-4" variant="primary">
          Seite nicht gefunden
        </Title>
        <Text>
          <p className="mb-2">
            Die von Ihnen aufgerufene Seite konnte nicht gefunden werden.
          </p>
          <p>
            Zurück zur{' '}
            <Link className="underline" href="/">
              Startseite
            </Link>
          </p>
        </Text>
      </Container>
  )
}
