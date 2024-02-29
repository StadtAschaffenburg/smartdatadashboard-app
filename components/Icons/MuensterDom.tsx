import * as React from 'react'
import { SVGProps } from 'react'
function SvgMuensterDom(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        stroke="#005b79"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34.342 182.997h130.772" strokeWidth={8} />
        <path
          d="M40.068 182.998V32.013l18.287-14.996 17.079 14.996v66.17M161.843 183V30.764L142.72 16.642l-18.759 14.122v65.92"
          strokeWidth={8}
        />
        <path
          d="M63.707 182.996v-74.575l36.459-31.026 37.389 31.026v74.576"
          strokeWidth={8}
        />
      </g>
    </svg>
  )
}
export default SvgMuensterDom
