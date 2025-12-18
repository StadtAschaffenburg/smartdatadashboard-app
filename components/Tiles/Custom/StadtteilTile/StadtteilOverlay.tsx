'use client'

import React, { useEffect, useState } from 'react'
import { MapDataType } from './dt'
import { animated, useSprings } from '@react-spring/web'

export default function StadtteilOverlay({
  map_data,
}: {
  map_data: MapDataType[]
}) {
  const [trigger, setTrigger] = useState(0)

  const [springs, api] = useSprings(map_data.length, index => ({
    from: { radius: map_data[index].radius },
    to: { radius: map_data[index].radius },
    config: { tension: 200, friction: 15 },
  }))

  useEffect(() => {
    api.start(index => ({
      to: async next => {
        await next({
          radius: map_data[index].radius * 0.8,
          config: { duration: 100 },
        })
        await next({
          radius: map_data[index].radius,
          config: { duration: 200 },
        })
      },
    }))
  }, [map_data, trigger, api])

  useEffect(() => {
    setTrigger(prev => prev + 1)
  }, [map_data])

  return (
    <>
      <svg
        className="stroke-purple fill-purple pointer-events-none absolute left-0 top-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* pins */}
        {map_data.map(data => (
          <circle
            cx={data.x2}
            cy={data.y2}
            fill="inherit"
            key={`pin-${data.id}`}
            r={5}
          />
        ))}

        {/* lines */}
        {map_data.map(data => (
          <line
            key={data.id}
            stroke="inherit"
            strokeWidth={2}
            x1={data.x1}
            x2={data.x2}
            y1={data.y1}
            y2={data.y2}
          />
        ))}

        {/* circles */}
        {map_data.map((data, index) => (
          <animated.circle
            className="opacity-50"
            cx={data.x2}
            cy={data.y2}
            fill="inherit"
            key={`circle-${data.id}`}
            r={springs[index].radius}
          />
        ))}
      </svg>
    </>
  )
}
