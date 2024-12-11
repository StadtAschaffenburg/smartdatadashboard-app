import { TilePayloadType } from '@/types/tiles'
import { TileVariants } from '@/utils/variants/TileVariants'

export interface InstitutionIndex {
  title: string
  icon?:
    | React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
  color?: string
  visible?: boolean
  seriesOption?: {
    name: string
    data: (string | number | null)[][]
    color: string
  }
  variant: keyof typeof TileVariants.variant
}

export type InstitutionIndices = Record<string, InstitutionIndex>

export type ChartProps = {
  tile_payload: TilePayloadType
}
