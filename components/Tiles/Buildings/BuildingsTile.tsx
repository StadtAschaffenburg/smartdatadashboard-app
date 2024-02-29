import { MsKlimadashboardIconsButtonAktivGebaeude } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type BuildingTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows building information
 * @param BuildingTileProps properties of the building tile
 * @returns Building Tile
 */
export default function BuildingTile({
  children,
  ...props
}: BuildingTileProps) {
  return (
    <IconTile {...props} icon={MsKlimadashboardIconsButtonAktivGebaeude} variant="building">
      <>{children}</>
    </IconTile>
  )
}
