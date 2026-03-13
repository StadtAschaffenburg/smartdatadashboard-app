'use client'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import StadtteilMap from './StadtteilMap'
import StadtteilMapMobile from './StadtteilMapMobile'
import {
  getDataSource,
  TilePayloadType,
} from '@schleegleixner/react-statamic-api'
import { getVariantType } from '@/utils/payload'
import { getRows } from '@schleegleixner/react-statamic-api'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { DestrictMapping } from './dt'

const initialDestictData: DestrictMapping[] = [
  {
    id: 'Strietwald',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Damm',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Leider',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Nilkheim',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Obernau',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Oesterreicher Kolonie',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Stadtmitte',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Obernauer Kolonie',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Schweinheim',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
  {
    id: 'Gailbach',
    position: { x: 10, y: 10 },
    share: 0,
    value: { current: 0, previous: 0 },
  },
]

export default function StadtteilContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const datasource = getDataSource(tile_payload)
  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )
  const [destictData, setDestictData] = useState(initialDestictData)

  const variant = getVariantType(tile_payload)
  const years = datasource.timeline

  useEffect(() => {
    if (!datasource) {
      return
    }

    const destrict_values = getRows(datasource, yearIndex)

    const current_values = destictData
      .map(d => destrict_values.rows[d.id]?.current ?? 0)
      .filter(value => typeof value === 'number' && !isNaN(value)) // Nur gültige Werte

    const total = current_values.reduce((acc, value) => acc + value, 0)

    const updatedDestictData = destictData.map(destrict => ({
      ...destrict,
      value: {
        current: destrict_values.rows[destrict.id]?.current ?? 0,
        previous: destrict_values.rows[destrict.id]?.previous ?? null,
      },
      share:
        total > 0
          ? ((destrict_values.rows[destrict.id]?.current ?? 0) / total) * 100
          : 0,
      title: destrict_values.rows[destrict.id]?.label ?? destrict.id,
    }))

    setDestictData(updatedDestictData)
  }, [datasource, yearIndex, tile_payload])

  if (!datasource) {
    return <RequestIndicator />
  }

  return (
    <>
      <div className="relative flex flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute left-0 hidden h-full w-full justify-center p-4 md:flex">
          <StadtteilMap destict_data={destictData} variant={variant} />
        </div>
        <div className="h-full justify-center p-4 md:hidden">
          <StadtteilMapMobile destict_data={destictData} variant={variant} />
        </div>
        <div className="absolute -bottom-10 left-0 flex h-full w-full justify-center lg:hidden"></div>
      </div>
      <div className="bg-white px-4 pb-4 lg:hidden"></div>
      <Slider
        default_value={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={index => setYearIndex(index)}
        variant={variant}
      />
    </>
  )
}
