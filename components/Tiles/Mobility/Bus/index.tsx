import MobilityTile from '../MobilityTile'
import BusContent from './BusContent'

export default function BusTile() {
  return (
    <MobilityTile
      dataSource="Stadtwerke Aschaffenburg"
      embedId="mobility-bus"
      live
      subtitle="Anzahl im Vergleich zu Bussen mit fossilem Antrieb"
      title="E-Busse"
    >
      <BusContent />
    </MobilityTile>
  )
}
