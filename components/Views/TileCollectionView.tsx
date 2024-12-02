'use client'

import React, { useEffect, useState } from 'react'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import CategoryType from '@/types/TilesCategory'
import Searchbox from '@/components/Elements/Searchbox'
import { TileDataType, TileSourceType } from '@/types/tiles'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import { findPage } from '@/utils/content'

interface DimensionViewProps {
  collection: TileDataType[]
  sources: TileSourceType[]
  category?: CategoryType | null
  structure?: string // expects something like 'action_dimension/action_field'
}

export default function TileCollectionView({
  collection,
  sources,
  category,
  structure,
}: DimensionViewProps) {
  const [action_dimension, setActionDimension] =
    useState<ActionDimensionsType | null>(null)
  const [action_field, setActionField] = useState<ActionFieldsType | null>(null)
  const [sdg_target, setSdgTarget] = useState<string | null>(null)

  // update collection with sources
  const updated_collection = collection.map(tile => {
    if (tile.content?.files && tile.content.files.length > 0) {
      const matched_sources = tile.content.files
        .map(file => sources.find(source => source.file_name === file))
        .filter((source): source is TileSourceType => source !== undefined)

      return {
        ...tile,
        content: {
          ...tile.content,
          sources: matched_sources,
        },
      }
    }
    return tile
  })

  const updateStateFromURL = () => {
    if (!structure) {
      return
    }

    const structure_parts = structure.split('/')
    const path_parts = window.location.pathname.split('/').filter(Boolean)

    structure_parts.forEach((part, index) => {
      const slug = path_parts[index + 1] || null
      const page = slug ? findPage(slug) : null

      if (part === 'action_dimension') {
        setActionDimension((page?.id as ActionDimensionsType) || null)
      } else if (part === 'action_field') {
        setActionField((page?.id as ActionFieldsType) || null)
      } else if (part === 'sdg_target') {
        setSdgTarget(page?.id || null)
      }
    })
  }

  useEffect(() => {
    updateStateFromURL()

    const originalPushState = history.pushState.bind(history)
    const originalReplaceState = history.replaceState.bind(history)

    const handleHistoryChange = () => {
      updateStateFromURL()
    }

    history.pushState = (...args) => {
      originalPushState(...args)
      handleHistoryChange()
    }

    history.replaceState = (...args) => {
      originalReplaceState(...args)
      handleHistoryChange()
    }

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
        collection={updated_collection}
        sdg_target={sdg_target}
      />
      <Searchbox />
    </BaseView>
  )
}
