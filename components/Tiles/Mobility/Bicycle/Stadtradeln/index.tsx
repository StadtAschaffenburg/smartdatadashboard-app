import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ChartContainer from './ChartContainer'

export default async function StadtradelnTile() {
  const tile_id = 'mobility-stadtradeln'

  return (
    <MobilityTile embedId={tile_id}>
      <ChartContainer />
    </MobilityTile>
  )
}
