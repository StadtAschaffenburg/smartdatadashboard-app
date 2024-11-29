'use client'

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
import { useEffect, useState } from 'react'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { scrollToElement } from '@/utils/scroll'

function getFieldIcon(field: ActionFieldsType) {
  return ActionFieldsIconMap[field]
}

interface ExtendedLinkProps {
  active?: boolean
  field_id?: ActionFieldsType
  link: LinkProps
}

export default function DimensionFilter() {
  const [action_dimension, setActionDimension] =
    useState<ActionDimensionsType | null>(null)
  const [action_field, setActionField] = useState<ActionFieldsType | null>(null)

  useEffect(() => {
    const path_segments = window.location.pathname.split('/').filter(Boolean)
    if (path_segments[1]) {
      setActionDimension(path_segments[1] as ActionDimensionsType)
    }
    if (path_segments[2]) {
      setActionField(path_segments[2] as ActionFieldsType)
    }
  }, [])

  const parent_page = findPage('dimensions')
  const dimension_pages = parent_page?.children ?? []
  const current_dimension_page = action_dimension
    ? findPage(action_dimension)
    : null

  // get the dimension links
  const dimension_links: ExtendedLinkProps[] = dimension_pages.map(
    dimension_page => {
      const dimension_id = dimension_page.id as ActionDimensionsType
      const active = dimension_id === current_dimension_page?.id

      return {
        active,
        link: {
          link: `/${parent_page?.slug}/${!active ? dimension_page.slug : ''}`,
          title: dimension_page.title,
          variant: dimension_id as ActionDimensionsType,
        },
      }
    },
  )

  const field_pages = action_dimension
    ? (findPage(action_dimension)?.children ?? [])
    : []

  // get the field links
  const field_links: ExtendedLinkProps[] = field_pages.map(field_page => {
    const fieldId = field_page.id as ActionFieldsType
    const active = fieldId === action_field

    return {
      active,
      field_id: fieldId,
      link: {
        link: `/handlungsdimensionen/${current_dimension_page?.slug}/${!active ? field_page.slug : ''}`,
        title: field_page.title,
        variant: current_dimension_page?.id as ActionDimensionsType,
      },
    }
  })
  const default_variant = 'primary'
  const variant = current_dimension_page?.id
    ? (current_dimension_page?.id as ActionDimensionsType)
    : default_variant

  const navigateTo = (dimension: string, field?: string) => {
    const new_url = field
      ? `/handlungsdimensionen/${dimension}/${field}`
      : `/handlungsdimensionen/${dimension}`
    setActionDimension(dimension as ActionDimensionsType)
    setActionField(field ? (field as ActionFieldsType) : null)
    window.history.pushState(null, '', new_url)
    scrollToElement()
  }

  return (
    <Background light variant={variant as BackgroundVariant}>
      <Container variant="compact">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
            {dimension_links.map(l => (
              <LinkComponent
                key={l.link.title}
                {...l.link}
                ButtonClass={getVariantClass(
                  l.link.variant as ActionDimensionsType,
                )}
                LinkClass={cx(
                  'flex-grow md:hover:scale-105 transition-all',
                  !action_dimension || l.active ? 'active' : 'max-md:hidden',
                )}
                onClick={() => navigateTo(l.link.link.split('/').pop()!)}
                preventDefault
                size={'filter_dimensions'}
              />
            ))}
          </div>
          {field_links.length > 0 && (
            <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
              {field_links.map(l => (
                <LinkComponent
                  {...l.link}
                  icon={getFieldIcon(l.field_id as ActionFieldsType)}
                  IconClass={'h-6 md:h-8'}
                  key={l.link.title}
                  LinkClass={cx('flex-grow self-stretch', l.active && 'active')}
                  onClick={() =>
                    navigateTo(action_dimension!, l.link.link.split('/').pop()!)
                  }
                  preventDefault
                  size={'filter_fields'}
                  variant={variant as ActionDimensionsType}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Background>
  )
}
