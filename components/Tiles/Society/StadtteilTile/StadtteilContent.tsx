'use client'
import Slider from '@/components/Inputs/Slider'
import { useEffect, useState } from 'react'
import StadtteilMap from './StadtteilMap'
import { TilePayloadType } from '@/types/tiles'
import { getAllSources, getVariantType } from '@/utils/payload'
import { getRow, getYears, InputDataType } from '@/utils/sources'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { DestrictMapping } from './dt'
import { getString } from '@/utils/payload'

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
    id: '�sterreicher Kolonie',
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
  const data: InputDataType[] = getAllSources(tile_payload, true)
  const variant = getVariantType(tile_payload)

  const years = getYears(data)
  const [yearIndex, setYearIndex] = useState(
    years.length > 0 ? years.length - 1 : 0,
  )

  const [destictData, setDestictData] = useState(initialDestictData)

  useEffect(() => {
    if (!data) {
      return
    }

    const destrict_values = getRow(
      data,
      yearIndex,
      tile_payload.table_keys ?? [],
    )

    const current_values = destictData
      .map(d => destrict_values[d.id]?.current ?? 0)
      .filter(value => typeof value === 'number' && !isNaN(value)) // Nur gültige Werte

    const total = current_values.reduce((acc, value) => acc + value, 0)

    const updatedDestictData = destictData.map(destrict => ({
      ...destrict,
      value: {
        current: destrict_values[destrict.id]?.current ?? 0,
        previous: destrict_values[destrict.id]?.previous ?? 0,
      },
      share:
        total > 0
          ? ((destrict_values[destrict.id]?.current ?? 0) / total) * 100
          : 0,
      title: getString(tile_payload, destrict.id, destrict.id),
    }))

    setDestictData(updatedDestictData)
  }, [data, yearIndex, tile_payload])

  if (!data) {
    return <RequestIndicator />
  }

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute left-0 hidden h-full w-full justify-center p-4 lg:flex">
          <StadtteilMap destict_data={destictData} />
        </div>
        <div className="absolute -bottom-10 left-0 flex h-full w-full justify-center lg:hidden"></div>
      </div>
      <div className="bg-white px-4 pb-4 lg:hidden"></div>
      <Slider
        defaultValue={[years.length - 1]}
        firstValueMobile={years.length - 1}
        labels={years}
        max={years.length - 1}
        min={0}
        onValueChange={([index]) => setYearIndex(index)}
        variant={variant}
      />
    </>
  )
}
