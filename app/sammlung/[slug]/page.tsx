import Columns from '@/components/Layout/Columns'
import { notFound } from 'next/navigation'
import getTilesBucket, { BaseTile } from '@/utils/fullWidthBucket'
import { getContent } from '@/lib/cms'

export const revalidate = 10

// ISR
export async function generateStaticParams() {
  const data = await getContent('all', 'collections')

  if (!data) {
    return [{ slug: undefined }]
  }

  return data.map(({ slug }: { slug: string }) => ({
    slug,
  }))
}

const getCollection = async (collectionSlug: string) => {
  const data = await getContent(collectionSlug, 'collections')

  return data
}

const getTileType = async (tileID: string) => {
  let data = await getContent(tileID, 'tiles')
  data = [data] // Todo: remove this line

  return data?.[0].tile_type
}

const getTileComponent = async (tile: BaseTile) => {
  return false
}

const getTileComponents = async (tiles: BaseTile[]) => {
  return Promise.all(
    tiles.map(async t => {
      return await getTileComponent(t)
    }),
  )
}

export default async function Collection({
  params,
}: {
  params?: { slug: string }
}) {
  if (!params) {
    return notFound()
  }

  const { slug } = params

  if (!slug) {
    return notFound()
  }

  const collection = await getCollection(slug)

  if (!collection || !collection[0]) {
    return notFound()
  }

  const { tiles } = collection[0]

  const sortedTiles = tiles.sort(
    (a: { sort: number }, b: { sort: number }) => a.sort - b.sort,
  )

  // sort tiles into buckets indicating full width display or column display
  const tileBuckets = await getTilesBucket(sortedTiles)

  return (
    <div>
      {await Promise.all(
        tileBuckets.map(async ({ tiles, isFullWidth }, i) => {
          if (isFullWidth) {
            return await getTileComponents(tiles)
          }

          return <Columns key={i}>{await getTileComponents(tiles)}</Columns>
        }),
      )}
    </div>
  )
}
