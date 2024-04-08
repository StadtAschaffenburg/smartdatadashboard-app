import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import BusContent from './BusContent'

export default function BusTile() {
  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-12-31T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource="VAB"
      embedId="mobility-bus"
      subtitle="Anzahl im Vergleich zu Bussen mit fossilem Antrieb"
      title="E-Busse"
    >
      <BusContent />
    </MobilityTile>
  )
}
