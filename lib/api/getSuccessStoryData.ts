import directus, { successStoriesCollectionName } from '../directus'
import { ID } from '@directus/sdk'
import { SuccessStoryTileProps } from '@/components/Tiles/SuccessStory'

export const getSuccessStoryData = async (successStoryID: ID) => {
  try {
    const data = await directus
      .items(successStoriesCollectionName)
      .readOne(successStoryID)
    const props: SuccessStoryTileProps = {
      id: data?.id ?? '',
      link: data?.link ?? '',
      text: data?.text ?? '',
      image: data?.image ?? '',
      imagePosition: data?.image_position,
      moreInfo: data?.details ?? '',
    }
    return props
  } catch (e) {
    return undefined
  }
}
