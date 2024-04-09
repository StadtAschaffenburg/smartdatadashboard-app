import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ChartContainer from './ChartContainer'

export default async function StadtradelnTile() {
  return (
    <MobilityTile
      dataRetrieval="31.12.2023"
      dataSource="Amt für Stadtplanung und Klimamanagement"
      embedId="mobility-stadtradeln"
      subtitle="auf der Überholspur"
      title="Stadtradeln"
    >
      <ChartContainer />
    </MobilityTile>
  )
}
