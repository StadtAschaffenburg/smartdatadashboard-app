import { format } from 'date-fns'
import BaseTile from '@/components/Tiles/Ecology/EcologyTile'
import AWMContent from './AWMContent'

export default async function AWMTile() {
  const tile_id = 'mobility-awm'

  return (
    <BaseTile
      dataRetrieval={format(new Date('2023-12-31T00:00:00.000Z'), 'dd.MM.yyyy')}
      embedId={tile_id}
      title="E-Mobilität"
    >
      <AWMContent />
    </BaseTile>
  )
}
