import * as React from 'react'
import type { SVGProps } from 'react'
function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-full w-full"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" fill="none" r="10" strokeWidth="2">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          from="8"
          repeatCount="indefinite"
          to="20"
        />
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1.5s"
          from="1"
          repeatCount="indefinite"
          to="0"
        />
      </circle>
      <circle cx="20" cy="20" r="10" />
    </svg>
  )
}
export default Icon
