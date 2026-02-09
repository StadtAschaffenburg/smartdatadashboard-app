'use client'

import { useEffect, useRef, useState } from 'react'
import StadtteilMapRow from './StadtteilMapRow'
import { StadtAbMap } from '@/components/Icons/Misc'
import { MapDataType, StadtteilMapProps } from './dt'
import { getSaveId } from '@/utils/convert'
import StadteilOverlay from './StadtteilOverlay'

export default function StadtteilMap({
  destict_data,
  variant,
}: StadtteilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [map_data, setMapData] = useState<MapDataType[]>([])

  useEffect(() => {
    const calculateMapData = () => {
      if (!containerRef.current) {
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()

      const data = destict_data.map(item => {
        const entryElement = document.getElementById(`entry-${item.id}`)
        const mapElement = document.getElementById(`pin-${getSaveId(item.id)}`)

        if (entryElement && mapElement) {
          const entryRect = entryElement.getBoundingClientRect()
          const mapRect = mapElement.getBoundingClientRect()

          const x1 = entryRect.left + entryRect.width / 2 - containerRect.left
          const y1 = entryRect.top + entryRect.height / 2 - containerRect.top
          const x2 = mapRect.left + mapRect.width / 2 - containerRect.left
          const y2 = mapRect.top + mapRect.height / 2 - containerRect.top

          return {
            id: item.id,
            x1,
            y1,
            x2,
            y2,
            radius: Math.max(10, item.share * 1.75),
          }
        }

        return { id: item.id, x1: 0, y1: 0, x2: 0, y2: 0, radius: 10 } // Fallback
      })

      setMapData(data)
    }

    calculateMapData()
    window.addEventListener('resize', calculateMapData) // recalculate on resize
    return () => window.removeEventListener('resize', calculateMapData)
  }, [destict_data])

  return (
    <div className="relative h-full w-full overflow-hidden" ref={containerRef}>
      <div className="relative z-30 flex h-full justify-between p-4 py-8">
        <StadtteilMapRow
          anchor_class="right-0"
          destict_data={destict_data.slice(
            0,
            Math.ceil(destict_data.length / 2),
          )}
          variant={variant}
        ></StadtteilMapRow>
        <StadtteilMapRow
          anchor_class="left-0"
          destict_data={destict_data.slice(Math.ceil(destict_data.length / 2))}
          entry_class="justify-end text-right"
          variant={variant}
        ></StadtteilMapRow>
      </div>
      <div className="absolute left-0 top-0 z-10 h-full w-full">
        <StadteilOverlay map_data={map_data} />
      </div>
      <div className="absolute left-0 top-1/2 z-0 h-4/6 w-full -translate-y-1/2 lg:h-5/6">
        <StadtAbMap className="fill-purple-light absolute left-1/2 top-1/2 z-10 h-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
