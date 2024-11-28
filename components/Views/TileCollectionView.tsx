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
import { fetchData } from '@/hooks/useSourceFile'

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
  const [loaded_sources, setLoadedSources] = useState<Record<string, string>>(
    {},
  )
  const [updated_collection, setUpdatedCollection] = useState<TileDataType[]>(
    () =>
      collection.map(tile => ({
        ...tile,
        sources: tile.content?.files
          ? tile.content.files.map(file_name => ({
              name: file_name,
              content: loaded_sources[file_name] || null,
            }))
          : [{ name: 'default', content: null }],
      })),
  )

  useEffect(() => {
    const loadSources = async () => {
      const new_loaded_sources = { ...loaded_sources }

      const updated_tiles = await Promise.all(
        updated_collection.map(async tile => {
          if (!tile.content?.files) {
            return tile
          }

          const sources = await Promise.all(
            tile.content.files.map(async file_name => {
              if (!new_loaded_sources[file_name]) {
                try {
                  const content = await fetchData(file_name)
                  new_loaded_sources[file_name] = content
                } catch (error) {
                  console.error(`Error loading file: ${file_name}`, error)
                  new_loaded_sources[file_name] = '0' // Default to "0" on error
                }
              }

              return {
                name: file_name,
                content: new_loaded_sources[file_name],
              }
            }),
          )

          return { ...tile, sources }
        }),
      )

      setLoadedSources(new_loaded_sources)
      setUpdatedCollection(updated_tiles)
    }

    //loadSources()
  }, [updated_collection])

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

    // Backup original methods to avoid conflicts
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
