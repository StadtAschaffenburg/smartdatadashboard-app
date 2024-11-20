'use client'

import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default function NoResults() {
  return (
    <Background light rounded>
      <Container>
        <div className="flex flex-col gap-4 text-center">
          <Title as="h3" variant="primary">
            Keine Ergebnisse gefunden
          </Title>
          <Text as="md">
            <p>Es wurden keine passenden Kacheln gefunden.</p>
            <p>Versuchen Sie es gegebenenfalls mit anderen Suchbegriffen.</p>
          </Text>
        </div>
      </Container>
    </Background>
  )
}
