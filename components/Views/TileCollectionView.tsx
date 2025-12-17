'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import {
  PageMappingType,
  TileDataType,
} from '@schleegleixner/react-statamic-api'
import CategoryType from '@/types/CategoryType'
import Spinner from '../Elements/Spinner'
import ActionDimensionsType from '@/types/ActionDimensionsType'

interface DimensionViewProps {
  category?: CategoryType | null
  collection: TileDataType[]
  page_data: PageMappingType
  sitemap: PageMappingType[]
}

export default function TileCollectionView({
  collection,
  category: initialCategory,
  page_data,
  sitemap,
}: DimensionViewProps) {
  const [filters_set, setFiltersSet] = useState<boolean>(false)
  const [category, setCategory] = useState<CategoryType | null>(
    initialCategory ?? null,
  )
  const [action_dimension, setActionDimension] =
    useState<ActionDimensionsType | null>(null)
  const [action_field, setActionField] = useState<string | null>(null)
  const [sdg_target, setSdgTarget] = useState<string | null>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!sitemap || !sitemap.length) {
      return
    }

    const fetchCategorySegments = async () => {
      setCategory(page_data.content.category ?? null as CategoryType | null)
      setActionDimension(page_data.content.action_dimension ?? null as ActionDimensionsType | null)
      setActionField(page_data.content.action_field ?? null)
      setSdgTarget(page_data.content.sdg_target ?? null)
      setFiltersSet(true)
    }
    fetchCategorySegments()
  }, [pathname, searchParams, sitemap])

  if (!filters_set) {
    return <Spinner className="mx-auto" />
  }

  return (
    <BaseView>
      <TileCollection
        action_dimension={action_dimension}
        action_field={action_field}
        category={category}
        collection={collection}
        sdg_target={sdg_target}
      />
    </BaseView>
  )
}
