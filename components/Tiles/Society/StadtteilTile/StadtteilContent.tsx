'use client'
import Slider from '@/components/Inputs/Slider'
import { useState } from 'react'
import StadtteilMap from './StadtteilMap'
import { TilePayloadType } from '@/types/tiles'
import { getAllSources, getVariantType } from '@/utils/payload'
import { getRow, getYears, InputDataType } from '@/utils/sources'
import Spinner from '@/components/Elements/Spinner'
import { DestrictMapping } from './dt'
import { getString } from '@/utils/payload'

const destrict_map: DestrictMapping[] = [
  {
    id: 'Strietwald',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Damm',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Leider',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Nilkheim',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Obernau',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: '�sterreicher Kolonie',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Stadtmitte',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Obernauer Kolonie',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Schweinheim',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
  },
  {
    id: 'Gailbach',
    position: { x: 10, y: 10 },
    radius: 0,
    value: {
      current: 0,
      previous: 0,
    },
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
  const destrict_values = getRow(data, yearIndex, tile_payload.table_keys ?? [])

  if (!data) {
    return <Spinner />
  }

  const currentValues = destrict_map.map(d => d.value.current)
  const minValue = Math.min(...currentValues)
  const maxValue = Math.max(...currentValues)
  const minRadius = 8
  const maxRadius = 60

  destrict_map.forEach(destrict => {
    destrict.value.current = destrict_values[destrict.id]?.current ?? 0
    destrict.value.previous = destrict_values[destrict.id]?.previous ?? 0
    destrict.title = getString(tile_payload, destrict.id, destrict.id)

    const { current } = destrict.value
    destrict.radius =
      minRadius +
      ((current - minValue) * (maxRadius - minRadius)) /
        (maxValue - minValue || 1)
  })

  return (
    <>
      <div className="relative flex h-96 flex-1 flex-col rounded bg-white p-2 md:h-[32rem]">
        <div className="absolute left-0 hidden h-full w-full justify-center p-4 lg:flex">
          <StadtteilMap destict_data={destrict_map} />
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
