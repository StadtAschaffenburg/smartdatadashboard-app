'use client'

import React, { useEffect, useState } from 'react'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import CategoryType from '@/types/TilesCategory'
import Searchbox from '@/components/Elements/Searchbox'
import { TileDataType } from '@/types/tiles'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import { findPage } from '@/utils/content'

interface DimensionViewProps {
  collection: TileDataType[]
  category?: CategoryType | null
  structure?: string // expects something like 'action_dimension/action_field'
}

export default function DimensionView({
  collection,
  category,
  structure,
}: DimensionViewProps) {
  const [action_dimension, setActionDimension] =
    useState<ActionDimensionsType | null>(null)
  const [action_field, setActionField] = useState<ActionFieldsType | null>(null)
  const [sdg_target, setSdgTarget] = useState<string | null>(null)

  useEffect(() => {
    if (structure) {
      // parse structure and URL
      const structure_parts = structure.split('/')
      const path_parts = window.location.pathname.split('/').filter(Boolean)

      // dynamically map structure to URL parts
      structure_parts.forEach((part, index) => {
        const slug = path_parts[index + 1]
        const page = findPage(slug)
        console.log('page', page)

        if (part === 'action_dimension') {
          setActionDimension((page?.id as ActionDimensionsType) || null)
        }
        if (part === 'action_field') {
          setActionField((page?.id as ActionFieldsType) || null)
        }
        if (part === 'sdg_target') {
          setSdgTarget(page?.id || null)
        }
      })
    }
  }, [structure])
  return (
    <BaseView>
      <TileCollection
        action_dimension={action_dimension}
        action_field={action_field}
        category={category}
        collection={collection}
        sdg_target={sdg_target}
      />
      <Searchbox />
    </BaseView>
  )
}
