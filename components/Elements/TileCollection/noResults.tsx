'use client'

import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default function NoResults() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-intangible border-b-4 border-secondary bg-secondary-light p-4 pt-6 text-center">
      <Title as="h3" variant="secondary">
        Keine Ergebnisse gefunden
      </Title>
      <Text as="sm">
        Es wurden keine Inhalte gefunden, die mit den gewählten Filtern bzw. dem
        Suchbegriff übereinstimmen.
      </Text>
    </div>
  )
}
