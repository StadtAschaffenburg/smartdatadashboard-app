import directus, {
  ENV_DIRECTUS_ITEM_STATUS,
  successStoriesCollectionName,
} from '../directus'

export default async function getSuccessStoriesForCategory(category: string) {
  const { data } = await directus
    .items(successStoriesCollectionName)
    .readByQuery({
      filter: {
        category,
        status: ENV_DIRECTUS_ITEM_STATUS,
      },
      limit: 3,
    })

  return data
}
