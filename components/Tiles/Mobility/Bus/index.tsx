import MobilityTile from '../MobilityTile'
import BusContent from './BusContent'

export default function BusTile() {
  return (
    <MobilityTile
      dataRetrieval=""
      dataSource="VAB"
      embedId="mobility-bus"
      subtitle="Anzahl im Vergleich zu Bussen mit fossilem Antrieb"
      title="E-Busse"
    >
      <BusContent />
    </MobilityTile>
  )
}
