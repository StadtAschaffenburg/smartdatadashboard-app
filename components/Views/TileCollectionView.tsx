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

  const updateStateFromURL = () => {
    if (structure) {
      const structure_parts = structure.split('/')
      const path_parts = window.location.pathname.split('/').filter(Boolean)

      structure_parts.forEach((part, index) => {
        const slug = path_parts[index + 1]
        const page = findPage(slug)

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
  }

  // we use the history API to keep the state in sync with the URL
  // alternatively, we could pass the state as props from the parent component
  useEffect(() => {
    // initial sync
    updateStateFromURL()

    // patch history API
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    const handleHistoryChange = () => {
      updateStateFromURL()
    }

    history.pushState = function (...args) {
      originalPushState.apply(this, args)
      handleHistoryChange()
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      handleHistoryChange()
    }

    // listener for popstate events
    window.addEventListener('popstate', handleHistoryChange)

    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('popstate', handleHistoryChange)
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
