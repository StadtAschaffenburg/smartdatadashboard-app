import React from 'react'
import Container from '@/components/Layout/Container'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import ContentBox from '@/components/Layout/ContentBox'
import { getVariantType } from '@/utils/payload'

export default function PageHeader({
  Icon,
  page_data,
  topline,
}: {
  Icon?: React.ReactNode
  page_data: PageMappingType
  topline?: string
}) {
  const variant = getVariantType(page_data)

  return (
    <Container className="mt-8 md:mt-12" variant="flat">
      <ContentBox variant={variant}>
        <div className="flex flex-row items-center gap-8 justify-between">
          <div>
            {topline && <Text className="uppercase">{topline}</Text>}
            <Title as="h1" margin="none">
              {page_data.title}
            </Title>
          </div>
          {Icon && <div className="aspect-square h-24">{Icon}</div>}
        </div>
      </ContentBox>
    </Container>
  )
}
