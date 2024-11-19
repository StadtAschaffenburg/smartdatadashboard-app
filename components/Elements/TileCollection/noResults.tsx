'use client'

import { Button } from '@/components/Elements/Button'
import Link from 'next/link'
import { removeParameterLink } from '@/utils/search'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default function NoResults() {
  return (
    <Background light rounded>
      <Container>
        <div className="flex flex-col gap-4 text-center">
          <Title as="h3">Keine Ergebnisse gefunden</Title>
          <Text as="lg">
            <p>Es wurden keine passenden Kacheln gefunden.</p>
            <p>Versuchen Sie es gegebenenfalls mit anderen Suchbegriffen.</p>
          </Text>
          <div className="mt-4 flex justify-center">
            <Link href={removeParameterLink()}>
              <Button size={'sm'}>Suchbegriffe zurücksetzen</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Background>
  )
}
