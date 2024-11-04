import { notFound } from 'next/navigation'
import DimensionView from '@/components/Views/DimensionView'
import dimensionMapping from '@/types/dimensionMapping'

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
  const mappedDimension = dimensionMapping.find(d => d.slug === slugDimension)
  const action_dimension = mappedDimension ? mappedDimension.id : undefined

  // find the matching field based on the slug
  const mappedField = mappedDimension?.fields.find(f => f.slug === slugField)
  const action_field = mappedField ? mappedField.id : undefined

  // get the search query from the URL
  const search_query = searchParams.search || ''

  if ((slugDimension && !mappedDimension) || (slugField && !mappedField)) {
    return notFound() // this will trigger the 404 page
  }

  return (
    <DimensionView
      action_dimension={action_dimension}
      action_field={action_field}
      search_query={search_query}
    />
  )
}
