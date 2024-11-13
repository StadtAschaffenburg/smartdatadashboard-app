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
import { findPage } from '@/utils/content'
import { ButtonVariant } from '@/utils/variants/ButtonVariants'

interface DimensionFilterProps {
  action_dimension?: ActionDimensionsType
  action_field?: ActionFieldsType
}

export default async function DimensionFilter({
  action_dimension,
  action_field,
}: DimensionFilterProps) {
  const parent_page = findPage('dimensions')
  const dimension_pages = parent_page?.children ?? []

  const current_dimension_page = action_dimension
    ? findPage(action_dimension)
    : null

  // const current_field_page = action_field ? findPage(action_field) : null

  // get the dimension links
  const dimension_links: LinkProps[] = dimension_pages.map(dimension_page => {
    const dimension_id = dimension_page.id as ActionDimensionsType
    const active = dimension_id === action_dimension

    return {
      link: `/${parent_page?.slug}/${!active ? dimension_page.slug : ''}`,
      title: dimension_page.title, // 'label' korrigiert zu 'title'
      variant: dimension_id as ButtonVariant,
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
      variant: current_dimension_page?.id as ButtonVariant,
      active: active,
    }
  })

  const default_variant = 'primary'
  const variant = action_dimension ? action_dimension : default_variant

  return (
    <Background light variant={variant}>
      <Container variant="compact">
        <div className="mt-4 flex items-center justify-between gap-4">
          {dimension_links.map(l => (
            <LinkComponent key={l.link} variant={variant} {...l} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          {field_links.map(l => (
            <LinkComponent key={l.link} size="md" variant={variant} {...l} />
          ))}
        </div>
      </Container>
    </Background>
  )
}
