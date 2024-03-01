import getContent from '@/utils/ContentFactory'

export default async function getSuccessStoriesForCategory(category: string) {
  const { data } = await getContent(category, 'successStory', {
    filter: {
      category
    }
  });

  return data
}