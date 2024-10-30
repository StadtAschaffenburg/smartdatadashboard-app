import {
  EcologyTile as BaseTile,
  TilePrefix,
} from '@/components/Tiles/Ecology/EcologyTile'
import PassengerContent from './PassengerContent'

export default function PassengerTile() {
  const tile_id = `${TilePrefix}-passengers`

  return (
    <BaseTile embedId={tile_id}>
      <PassengerContent></PassengerContent>
    </BaseTile>
  )
}
