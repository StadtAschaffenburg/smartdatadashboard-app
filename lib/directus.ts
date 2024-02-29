import { TileType } from '@/utils/TileFactory'
import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export const mainPageName = 'MainPage'
export const collectionsName = 'collections'
export const tileCollectionName = 'tiles'
export const surveyCollectionName = 'survey'
export const successStoriesCollectionName = 'successStory'

export type DirectusStatus = 'draft' | 'archived' | 'published'

export type MainPage = {
  id: ID
  status: DirectusStatus
  tiles: {
    id: ID
    collections_id: ID
    item: ID
    collection: typeof tileCollectionName | typeof surveyCollectionName
    sort: number
  }[]
}

export type Collection = {
  id: ID
  status: DirectusStatus
  title: string
  description?: string
  image: string
  slug?: string
  tiles: {
    id: ID
    collections_id: ID
    item: ID
    collection: typeof tileCollectionName | typeof surveyCollectionName
    sort: number
  }[]
}

export type Tile = {
  id: ID
  name: string
  group: any
  full_width: boolean
  tile_id: TileType
  details: string
  data_url: string
  info: string
}

export type SuccessStory = {
  id: ID
  status: DirectusStatus
  text: string
  link: string
  image?: string
  image_position: 'left' | 'right'
  category: string
  details: string
}

export type Survey = {
  id: ID
  status: DirectusStatus
  title: string
  question: string
  answer_percent: number
  answer_text: string
  category: string
  dataSource: string
  dataRetrieval: Date
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  mainPage: MainPage
  collections: Collection
  tiles: Tile
  successStory: SuccessStory
  survey: Survey
}

const directus = new Directus<DirectusCollection>(directusUrl)

export default directus

export function directusImage(image: string) {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`
}

function parseStatus(input: string | undefined): DirectusStatus | undefined {
  if (input === 'published' || input === 'draft' || input === 'archived') {
    return input as DirectusStatus
  }

  return undefined
}

export const ENV_DIRECTUS_ITEM_STATUS: DirectusStatus =
  parseStatus(process.env.DIRECTUS_ITEM_STATUS) || 'published'
