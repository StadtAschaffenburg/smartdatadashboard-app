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
} from '@/mapping/ActionDimensionsMapping'
import { cx } from 'class-variance-authority'
import { ActionFieldsIconMap } from '@/mapping/ActionFieldsMapping'
import { useEffect, useState } from 'react'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { scrollToElement } from '@/utils/scroll'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'
import Spinner from '@/components/Elements/Spinner'

function getFieldIcon(field: ActionFieldsType) {
  return ActionFieldsIconMap[field]
}

export default function DimensionFilter({
  page_data,
  sitemap,
}: {
  page_data: PageMappingType
  sitemap: PageMappingType[]
}) {
  const [dimensionPages, setDimensionPages] = useState<PageMappingType[] | null>(null)
  const [fieldPages, setFieldPages] = useState<PageMappingType[] | null>(null)
  const [variant, setVariant] = useState<BackgroundVariant>('primary')

  console.log(sitemap)
  console.log(page_data)

  useEffect(() => {
    if (!sitemap) {
      return
    }

    const dimensionPages = sitemap.filter(
      (page: any) =>
        page.content.action_dimension && !page.content.action_field,
    )
    setDimensionPages(dimensionPages)

    const fieldPages = sitemap.filter(
      (page: any) => page.content.action_dimension === page_data.content.action_dimension && page.content.action_field,
    )
    setFieldPages(fieldPages)
  }, [sitemap, page_data])

  useEffect(() => {
    setVariant(getVariantType(page_data.content) as BackgroundVariant)
  }, [page_data])

  const slugs = window.location.pathname.split('/').filter(Boolean)

  if (!dimensionPages && !fieldPages) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <Background light variant={variant as BackgroundVariant}>
      <Container variant="compact">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
            {dimensionPages?.map(page => (
              <>
              <LinkComponent
                key={page.slug}
                {...page}
                link={page.full_url}
                LinkClass={cx(
                  'flex-grow md:hover:scale-105 transition-all',
                  (page.content.action_dimension === page_data.content.action_dimension
                    ? 'active'
                    : 'max-md:hidden'),
                )}
                preventDefault
                size={'filter_dimensions'}
                variant={getVariantType(page.content) as ActionDimensionsType}
              />
              <div>{ getVariantType(page.content) }</div></>
            ))}
          </div>
          {fieldPages && fieldPages.length > 0 && (
            <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
              {fieldPages.map(page => (
                <LinkComponent
                  {...page}
                  link={page.full_url}
                  icon={getFieldIcon(page.action_field as ActionFieldsType)}
                  IconClass={'h-6 md:h-8'}
                  key={page.slug}
                  LinkClass={cx(
                    'flex-grow self-stretch',
                    page.content.action_field === page_data.content.action_field
                      ? 'active'
                      : 'max-md:hidden',
                  )}
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
