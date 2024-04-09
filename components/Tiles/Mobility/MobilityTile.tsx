import { MsKlimadashboardIconsButtonAktivMobil } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type MobilityTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows Mobility information
 * @param MobilityTileProps properties of the mobility tile
 * @returns Mobility Tile
 */
export default function MobilityTile({
  children,
  ...props
}: MobilityTileProps) {
  return (
    <IconTile
      {...props}
      icon={MsKlimadashboardIconsButtonAktivMobil}
      variant="mobility"
    >
      <>{children}</>
    </IconTile>
  )
}
