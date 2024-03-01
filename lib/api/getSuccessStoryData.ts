import { SuccessStoryTileProps } from '@/components/Tiles/SuccessStory'
import getOne from '@/utils/ContentFactory'

export const getSuccessStoryData = async (successStoryID: number | string) => {
  try {
    const data = await getOne(successStoryID.toString(), 'successStory')

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
