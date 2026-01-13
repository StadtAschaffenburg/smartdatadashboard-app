'use client'

import React from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/mapping/ActionDimensionsMapping'
import { useEffect, useState } from 'react'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { scrollToElement } from '@/utils/scroll'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'
import Spinner from '@/components/Elements/Spinner'
import DimensionLink from './DimensionLink'
import FieldLink from './FieldLink'

export default function DimensionFilter({
  page_data,
  sitemap,
}: {
  page_data: PageMappingType
  sitemap: PageMappingType[]
}) {
  const [dimensionPages, setDimensionPages] = useState<
    PageMappingType[] | null
  >(null)
  const [fieldPages, setFieldPages] = useState<PageMappingType[] | null>(null)
  const [variant, setVariant] = useState<BackgroundVariant>('primary')

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
      (page: any) =>
        page.content.action_dimension === page_data.content.action_dimension &&
        page.content.action_field,
    )
    setFieldPages(fieldPages)
  }, [sitemap, page_data])

  useEffect(() => {
    setVariant(getVariantType(page_data.content) as BackgroundVariant)
  }, [page_data])

  const onClick = (targetUrl: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    // change the URL without server-rendering
    window.history.pushState({}, '', targetUrl)

    setTimeout(() => {
      scrollToElement('tile-collection', -100)
    }, 500)
  }

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
            {dimensionPages?.map(page => {
              const current_action_dimension = page_data.content.action_dimension
              const isActive = page.slug === page_data.slug || page.content.action_dimension === page_data.content.action_dimension
              const linkUrl = isActive && page.parent
                ? page.parent.full_url
                : page.full_url
              return (
                <DimensionLink
                  actionDimension={page.content.action_dimension as ActionDimensionsType}
                  active={!current_action_dimension || isActive}
                  key={page.slug}
                  link={linkUrl}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onClick(linkUrl, event)}
                  {...page}
                />
              )
            })}
          </div>
          {fieldPages && fieldPages.length > 0 && (
            <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
              {fieldPages.map(page => {
                const isActive = page.content.action_field === page_data.content.action_field
                const linkUrl = isActive && page.parent
                  ? page.parent.full_url
                  : page.full_url
                return (
                    <FieldLink
                      actionField={page.content.action_field as ActionFieldsType}
                      active={isActive}
                      key={page.slug}
                      link={linkUrl}
                      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onClick(linkUrl, event)}
                      variant={variant}
                      {...page}
                    />
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </Background>
  )
}
