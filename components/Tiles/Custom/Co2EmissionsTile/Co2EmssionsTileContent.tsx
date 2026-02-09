'use client'

import { useMemo, useState } from 'react'
import Switch from '@/components/Inputs/Switch'
import ChartContent from '@/components/Tiles/Default/LineChart/ChartContent'
import { getVariantType } from '@/utils/payload'
import { getDataSource, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { getString } from '@schleegleixner/react-statamic-api'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function Co2EmissionsTileContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const [showFuture, setShowFuture] = useState(false)
  const variant = getVariantType(tile_payload)
  const switch_label = getString(tile_payload, 'switch_label')

  const filtered_payload = useMemo(() => {
    if (!showFuture || !tile_payload.datasources?.[0]) {
      return tile_payload
    }

    const payload_copy = structuredClone(tile_payload)
    if (!payload_copy.datasources || !payload_copy.datasources[0]) {
      return payload_copy
    }
    const ds = payload_copy.datasources[0]
    const last_row = ds.content[ds.entry_count - 1]

    Object.keys(last_row).forEach(key => {
      if (key !== 'INDEX') {
        last_row[key] = 0
      }
    })

    return payload_copy
  }, [showFuture, tile_payload])

  const datasource = getDataSource(filtered_payload)

  if (!datasource || !datasource.content?.length) {
    return <RequestIndicator />
  }

  return (
    <ChartContent
      datasource={datasource}
      switch={
        <div className="flex items-center justify-end">
          <Switch
            checked={showFuture}
            label={switch_label || 'Prognose'}
            onCheckedChange={setShowFuture}
            variant={variant}
          />
        </div>
      }
      tile_payload={filtered_payload}
    />
  )
}
