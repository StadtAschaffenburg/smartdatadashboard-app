'use client'

import React, { JSX } from 'react'
import Container from '@/components/Layout/Container'
import { TileDataType, useTileset } from '@schleegleixner/react-statamic-api'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import TileFactory from '@/utils/factories/TileFactory'
import { notFound } from 'next/navigation'

export default function TilesTemplate({
  tile_id,
  site_id,
}: {
  tile_id: string
  site_id: string
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(site_id)

  if (is_loading || has_error || !collection) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  const tile = collection.find(
    (tile: TileDataType) => tile.tile_id === tile_id,
  ) as TileDataType

  if (!tile) {
    return notFound()
  }

  return <TileFactory tile_data={tile.content} type={tile.tile_id} />
}
