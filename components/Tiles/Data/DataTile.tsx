import { MsKlimadashboardIconsButtonAktivEnergieV1 } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type EnergyTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows Energy information
 * @param EnergyTileProps properties of the Energy tile
 * @returns Energy Tile
 */
export default function DataTile({ children, ...props }: EnergyTileProps) {
  return (
    <IconTile {...props} icon={MsKlimadashboardIconsButtonAktivEnergieV1} variant="data">
      <>{children}</>
    </IconTile>
  )
}
