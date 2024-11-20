import { notFound } from 'next/navigation'
import TileCollectionView from '@/components/Views/TileCollectionView'
import DimensionFilter from '@/components/Layout/DimensionFilter'
import { findPage } from '@/utils/content'
import Container from '@/components/Layout/Container'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import PageIntro from '@/components/Elements/PageIntro'

interface HandlungsdimensionenProps {
  params: {
    slug?: string[]
  }
  searchParams: {
    suche?: string
  }
}

export default function Handlungsdimensionen({
  params,
  searchParams,
}: HandlungsdimensionenProps) {
  // extract dimension and field from the slug array
  const [slugDimension, slugField] = params.slug ?? []

  // find the matching dimension based on the slug
  const dimension_page = findPage(slugDimension)
  const action_dimension = dimension_page?.id as
    | ActionDimensionsType
    | undefined

  // find the matching field based on the slug
  const field_page = findPage(slugField)
  const action_field = field_page?.id as ActionFieldsType | undefined

  if ((slugDimension && !action_dimension) || (slugField && !action_field)) {
    return notFound() // this will trigger the 404 page
  }

  return (
    <>
      <PageIntro container slug="handlungdimensionen" />
      <DimensionFilter
        action_dimension={action_dimension}
        action_field={action_field}
      />
      <Container>
        <TileCollectionView
          action_dimension={action_dimension}
          action_field={action_field}
          category={'default'}
        />
      </Container>
    </>
  )
}
