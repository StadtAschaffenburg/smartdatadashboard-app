import TileFactory from '@/utils/TileFactory'
import { TileType } from '@/types/tiles'
import { notFound } from 'next/navigation'

export const revalidate = 10

export default async function Share({ params }: { params: { id: TileType } }) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  return <TileFactory type={id} />
}
