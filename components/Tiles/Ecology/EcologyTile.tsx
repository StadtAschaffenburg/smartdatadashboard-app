import { MsKlimadashboardIconsButtonAktivGebaeude } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type EcologyTileProps = Omit<IconTileProps, 'variant' | 'icon'>

export const TilePrefix = 'ecology'

/**
 * A tile that shows building information
 * @param BuildingTileProps properties of the building tile
 * @returns Building Tile
 */
export function EcologyTile({ children, ...props }: EcologyTileProps) {
  return (
    <IconTile
      {...props}
      icon={MsKlimadashboardIconsButtonAktivGebaeude}
      variant="building"
    >
      <>{children}</>
    </IconTile>
  )
}
