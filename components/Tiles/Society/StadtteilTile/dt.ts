
export type DestrictMapping = {
  id: string
  title?: string
  position: { x: number; y: number }
  radius: number
  value: {
    current: number
    previous: number
  }
}

export interface StadtteilMapProps {
  destict_data: DestrictMapping[]
}

export type LineData = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  radius: number
}
