import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import PassengerContent from './PassengerContent'

export default function PassengerTile() {
  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-05-22T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadtwerke Münster'}
      embedId="mobility-passengers"
      subtitle={'Entwicklung der Fahrgastzahlen in den Bussen der Stadtwerke'}
      title={'ÖPNV'}
    >
      <PassengerContent></PassengerContent>
    </MobilityTile>
  )
}
