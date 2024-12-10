import { BuildingType } from './dt'
import { SVGProps } from 'react'

import {
  IconBuildingArena,
  IconBuildingBibliothek,
  IconBuildingRathaus,
  IconBuildingSchule,
} from '@/components/Icons/Ecology'

export const buildingIcon: Record<
  keyof BuildingType,
  (_props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  brentanoschule: IconBuildingSchule,
  stadtbibliothek: IconBuildingBibliothek,
  frankenstolz_arena: IconBuildingArena,
  rathaus: IconBuildingRathaus,
}
