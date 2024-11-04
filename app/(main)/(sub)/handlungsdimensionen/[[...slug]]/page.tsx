import { notFound } from 'next/navigation'
import DimensionView from '@/components/Views/DimensionView'
import DimensionFilter from '@/components/Layout/DimensionFilter'
import { findPage } from '@/lib/sitemap'
import Container from '@/components/Layout/Container'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'

export const revalidate = 10

interface HandlungsdimensionenProps {
  params: {
    slug?: string[]
  }
  searchParams: {
    search?: string
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

  // get the search query from the URL
  const search_query = searchParams.search || ''

  if ((slugDimension && !action_dimension) || (slugField && !action_field)) {
    return notFound() // this will trigger the 404 page
  }

  return (
    <>
      <DimensionFilter action_dimension={action_dimension} />
      <Container>
        <DimensionView
          action_dimension={action_dimension}
          action_field={action_field}
          search_query={search_query}
        />
      </Container>
    </>
  )
}
