import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <TileCollection category="default" />
    </BaseView>
  )
}
