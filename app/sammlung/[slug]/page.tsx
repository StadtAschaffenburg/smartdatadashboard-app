import Columns from '@/components/Layout/Columns'
import directus, {
  collectionsName,
  ENV_DIRECTUS_ITEM_STATUS,
  tileCollectionName,
} from '@/lib/directus'
import { notFound } from 'next/navigation'
import getTilesBucket, { BaseTile } from '@/utils/fullWidthBucket'
import TileFactory, { TileType } from '@/utils/TileFactory'
import { SurveyTileProps } from '@/components/Tiles/Survey'
import { SuccessStoryTileProps } from '@/components/Tiles/SuccessStory'
import { getSurveyData } from '@/lib/api/getSurveyData'
import { getSuccessStoryData } from '@/lib/api/getSuccessStoryData'

export const revalidate = 10

// ISR
export async function generateStaticParams() {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['slug'],
    filter: {
      status: ENV_DIRECTUS_ITEM_STATUS,
    },
  })

  if (!data) {
    return [{ slug: undefined }]
  }

  return data.map(({ slug }) => ({
    slug,
  }))
}

const getCollection = async (collectionSlug: string) => {
  const { data } = await directus.items(collectionsName).readByQuery({
    filter: {
      slug: collectionSlug,
      status: ENV_DIRECTUS_ITEM_STATUS,
    },
    fields: ['tiles.*'],
    deep: {
      tiles: {},
    },
  })

  return data
}

const getTileType = async (tileID: string) => {
  const data = await directus.items(tileCollectionName).readOne(tileID)

  return data?.tile_id
}

const getTileComponent = async (tile: BaseTile) => {
  let props:
    | { surveyData?: SurveyTileProps; successStoryData?: SuccessStoryTileProps }
    | undefined
  let type: TileType
  if (tile.collection === 'survey') {
    const surveyData = await getSurveyData(tile.item)
    props = { surveyData }
    type = 'survey'
  } else if (tile.collection === 'successStory') {
    const successStoryData = await getSuccessStoryData(tile.item)
    props = { successStoryData }
    type = 'successStory'
  } else {
    type = (await getTileType(tile.item as string)) as TileType
  }

  return <TileFactory key={tile.item} type={type} {...props} />
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

  const sortedTiles = tiles.sort((a, b) => a.sort - b.sort)

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
