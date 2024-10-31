import { MsKlimadashboardIconsButtonAktivGebaeude } from '@/components/Icons/Misc'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type EcologyTileProps = Omit<IconTileProps, 'variant' | 'icon'>

export const TilePrefix = 'ecology'

export default function EcologyTile({ children, ...props }: EcologyTileProps) {
  return (
    <IconTile {...props} icon={MsKlimadashboardIconsButtonAktivGebaeude}>
      <>{children}</>
    </IconTile>
  )
}
