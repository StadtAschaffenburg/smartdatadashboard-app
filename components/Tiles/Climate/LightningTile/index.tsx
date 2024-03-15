import ClimateTile from '../ClimateTile'
import LightningTileContent from './LightningTileContent'

export default function LightningTile() {
  return (
    <ClimateTile
      dataSource="Deutscher Wetterdienst"
      embedId={'climate-lightning'}
      live
      title={'Blitze'}
    >
      <LightningTileContent />
    </ClimateTile>
  )
}
