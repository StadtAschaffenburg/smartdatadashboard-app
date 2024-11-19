import TileFactory from '@/utils/TileFactory'
import { TileType } from '@/types/tiles'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/cms'

export const revalidate = false

export default async function Share({ params }: { params: { id: TileType } }) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  const tile_data = await getContent('tile', id)

  return <TileFactory tile_data={tile_data} type={id} />
}
