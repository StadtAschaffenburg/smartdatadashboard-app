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
import { cx } from 'class-variance-authority'
import { getVariantClass } from '@/utils/variants/ActionDimensionLink'
import { ActionFieldsIconMap } from '@/types/dimensionMapping'

function getFieldIcon(field: ActionFieldsType) {
  return ActionFieldsIconMap[field]
}

interface DimensionFilterProps {
  action_dimension?: ActionDimensionsType
  action_field?: ActionFieldsType
}

interface ExtendedLinkProps {
  active?: boolean
  field_id?: ActionFieldsType
  link: LinkProps
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
  const dimension_links: ExtendedLinkProps[] = dimension_pages.map(
    dimension_page => {
      const dimension_id = dimension_page.id as ActionDimensionsType
      const active = dimension_id === action_dimension

      return {
        active: active,
        link: {
          link: `/${parent_page?.slug}/${!active ? dimension_page.slug : ''}`,
          title: dimension_page.title,
          variant: dimension_id as ActionDimensionsType,
        },
      } as ExtendedLinkProps
    },
  )

  // get the field links
  const field_pages = action_dimension
    ? (findPage(action_dimension)?.children ?? [])
    : []
  const field_links: ExtendedLinkProps[] = field_pages.map(field_page => {
    const field_id = field_page.id as ActionFieldsType
    const active = field_id === action_field

    return {
      active: active,
      field_id: field_id,
      link: {
        link: `/handlungsdimensionen/${current_dimension_page?.slug}/${!active ? field_page.slug : ''}`,
        title: field_page.title,
        variant: current_dimension_page?.id as ActionDimensionsType,
      },
    } as ExtendedLinkProps
  })

  const default_variant = 'primary'
  const variant = action_dimension ? action_dimension : default_variant

  return (
    <Background light variant={variant}>
      <Container variant="compact">
        <div className="flex flex-col gap-8">
          <div className="flex w-full justify-stretch gap-8">
            {dimension_links.map(l => (
              <LinkComponent
                key={l.link.title}
                {...l.link}
                ButtonClass={cx(
                  getVariantClass(l.link.variant as ActionDimensionsType),
                  'w-full border-0 shadow',
                )}
                LinkClass={cx(
                  'flex-grow hover:scale-105 transition-all',
                  (!action_dimension || l.active) && 'active',
                )}
                size={'filter_dimensions'}
              />
            ))}
          </div>
          {field_links.length > 0 && (
            <div className="flex items-center gap-8">
              {field_links.map(l => (
                <LinkComponent
                  key={l.link.title}
                  size="md"
                  variant={variant}
                  {...l.link}
                  icon={getFieldIcon(l.field_id)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Background>
  )
}
