import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import BusContent from './BusContent'

export default function BusTile() {
  return (
    <BaseTile
      dataRetrieval=""
      dataSource="VAB"
      embedId="mobility-bus"
      subtitle="Anzahl im Vergleich zu Bussen mit fossilem Antrieb"
      title="E-Busse"
    >
      <BusContent />
    </BaseTile>
  )
}
