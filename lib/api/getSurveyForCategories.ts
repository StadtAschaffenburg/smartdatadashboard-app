import directus, {
  ENV_DIRECTUS_ITEM_STATUS,
  surveyCollectionName,
} from '../directus'

export default async function getSurveysForCategory(category: string) {
  const { data } = await directus.items(surveyCollectionName).readByQuery({
    filter: {
      category,
      status: ENV_DIRECTUS_ITEM_STATUS,
    },
  })

  return data
}
