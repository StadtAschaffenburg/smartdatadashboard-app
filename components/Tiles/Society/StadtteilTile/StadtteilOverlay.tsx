'use client'

import React from 'react'
import { LineData } from './dt'

export default function StadtteilOverlay({ lines }: { lines: LineData[] }) {
  console.log(lines)
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 h-full w-full fill-society stroke-society"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines.map(line => (
        <circle
          cx={line.x2}
          cy={line.y2}
          fill="inherit"
          key={`poi-${line.id}`}
          r={5}
        />
      ))}

      {/* Linien */}
      {lines.map(line => (
        <line
          key={line.id}
          stroke="inherit"
          strokeWidth={2}
          x1={line.x1}
          x2={line.x2}
          y1={line.y1}
          y2={line.y2}
        />
      ))}

      {/* Kreise */}
      {lines.map(line => (
        <circle
          className="opacity-50"
          cx={line.x2}
          cy={line.y2}
          fill="inherit"
          key={`circle-${line.id}`}
          r={line.radius}
        />
      ))}
    </svg>
  )
}
