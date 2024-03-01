import getContent from '@/utils/ContentFactory'

export default async function getSurveysForCategory(category: string) {
  const { data } = await getContent(category, 'survey', {
    filter: {
      category
    },
  })


  return data
}