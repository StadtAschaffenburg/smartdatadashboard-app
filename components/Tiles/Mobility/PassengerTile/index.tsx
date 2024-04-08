import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import PassengerContent from './PassengerContent'

export default function PassengerTile() {
  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-12-31T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'VAB'}
      embedId="mobility-passengers"
      subtitle={'Entwicklung der Fahrgastzahlen in den Bussen der VAB'}
      title={'ÖPNV'}
    >
      <PassengerContent></PassengerContent>
    </MobilityTile>
  )
}
