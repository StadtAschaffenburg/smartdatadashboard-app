import { MsKlimadashboardIconsButtonAktivKlima } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type ClimateTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows climate information
 * @param ClimateTileProps properties of the climate tile
 * @returns Climate Tile
 */
export default function ClimateTile({ children, ...props }: ClimateTileProps) {
  return (
    <IconTile {...props} icon={MsKlimadashboardIconsButtonAktivKlima} variant="climate">
      <>{children}</>
    </IconTile>
  )
}
