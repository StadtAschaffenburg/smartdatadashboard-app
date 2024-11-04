import React from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, {
  LinkProps,
} from '@/components/Layout/Navbar/LinkComponent'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import { findPage } from '@/lib/sitemap'

interface DimensionViewProps {
  action_dimension?: ActionDimensionsType
  action_field?: ActionFieldsType
}

export default async function DimensionView({
  action_dimension,
  action_field,
}: DimensionViewProps) {
  const parent_page = findPage('dimensions')
  const dimension_pages = parent_page?.children ?? []

  const current_dimension_page = action_dimension
    ? findPage(action_dimension)
    : null
  const current_field_page = action_field ? findPage(action_field) : null

  // get the dimension links
  const dimension_links: LinkProps[] = dimension_pages.map(dimension_page => {
    const dimension_id = dimension_page.id as ActionDimensionsType
    const active = dimension_id === action_dimension

    return {
      link: `/handlungsdimensionen/${!active ? dimension_page.slug : ''}`,
      title: dimension_page.title, // 'label' korrigiert zu 'title'
      active: active,
    }
  })

  // get the field links
  const field_pages = action_dimension
    ? (findPage(action_dimension)?.children ?? [])
    : []
  const field_links: LinkProps[] = field_pages.map(field_page => {
    const field_id = field_page.id as ActionFieldsType
    const active = field_id === action_field

    return {
      link: `/handlungsdimensionen/${current_dimension_page?.slug}/${!active ? field_page.slug : ''}`,
      title: field_page.title,
      active: active,
    }
  })

  return (
    <Background>
      <Container>
        <div className="mt-4 flex items-center justify-between">
          {dimension_links.map(l => (
            <LinkComponent key={l.link} variant="primary" {...l} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          {field_links.map(l => (
            <LinkComponent key={l.link} variant="primary" {...l} />
          ))}
        </div>
      </Container>
    </Background>
  )
}
